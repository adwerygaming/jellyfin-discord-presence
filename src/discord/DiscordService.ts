import { Presence } from "discord-rpc"
import JellyfinService from "../jellyfin/JellyfinService.js"
import Tags from "../utils/Tags.js"
import DiscordRPC from "./Client.js"

const DISCORD_MAX_STRING_LENGTH = 128

// IDLE SYSTEM
const allowIdle = true      // toggle idle system
const idleThreshold = 2     // number of updates before considering idle
let idleStateCounter = 0
let isIdle = false
let wasTellingIdle = false

export const DiscordService = {
    UpdateRPC: async () => {
        const mySession = await JellyfinService.User.GetMySession()

        //! TODO
        /**
         * 1. Remove timestamp when paused [doesnt work appearently]
         * 2. Format [done]
         *      Movie/TV Shows: 
         *          Details: S{Season}:E{Episode} - {Episode Title}
         *          State: {Series Title}
         *      Music:
         *          Details: {Track Title}
         *          State: {Artist}
         * 4. fix the get type thingy lol [done]
         */

        if (mySession) { 
            const username = mySession?.UserName ?? "User"
            const np = mySession?.NowPlayingItem
            const ps = mySession?.PlayState

            const isPaused = ps?.IsPaused

            // const username = mySession.UserName // Your jellyfin username
            // const deviceName = mySession.DeviceName // example: MASDEPAN-LAPTOP (Chrome)
            const clientName = mySession.Client // likely 'Jellyfin Web' or 'Jellyfin Android'

            const obj: Presence = {
                startTimestamp: undefined,
                endTimestamp: undefined,
                largeImageKey: "jellyfin_logo",
                largeImageText: `${clientName}`,
                details: undefined,
                state: undefined
            };

            // console.log(`[${Tags.Debug}] NowPlaying: ${np ? true : false}`)
            // console.log(`[${Tags.Debug}] isPaused: ${isPaused ? true : false}`)
            // console.log(`[${Tags.Debug}] isIdle: ${isIdle}`)
            // console.log(`[${Tags.Debug}] idle: ${idleStateCounter}/${idleThreshold}`)

            // Idle system on no playback or paused
            if (!np || isPaused) {
                obj.details = "On Homepage"
                obj.state = "Scrolling through library."

                if (allowIdle && !isIdle) {
                    if (idleStateCounter >= idleThreshold) {
                        isIdle = true
                    } else {
                        idleStateCounter++
                    }
                }
            }

            if (isIdle && (!np || isPaused)) {
                // console.log(`[${Tags.Debug}] Idle.`)
                if (!wasTellingIdle) {
                    console.log(`[${Tags.Jellyfin}] ${username} is now idle.`)
                    wasTellingIdle = true
                }

                idleStateCounter = 0
                await DiscordRPC.clearActivity()
                return
            }

            isIdle = false
            
            // Trigger back when user is no longer idle
            if (!isIdle && wasTellingIdle) {
                console.log(`[${Tags.Jellyfin}] ${username} is back online!`)
                wasTellingIdle = false
            }
            
            // console.log(np)
            const startTime = Date.now() - Math.floor(mySession?.PlayState?.PositionTicks / 10000);
            // const runtimeTicks = np?.RunTimeTicks ?? 0
            // const endTime = startTime + Math.floor(runtimeTicks / 10000);

            // console.log(`[${Tags.Debug}] startTime: ${new Date(startTime).toTimeString()}`)
            // console.log(`[${Tags.Debug}] endTime: ${new Date(endTime).toTimeString()}`)

            // tv series:
            /**
             *  Type: 'Episode',
             *  SeasonName: 'Season 1',
             *  Name: 'I Knew at First Glance That It Was No Ordinary Fluffball',
             *  IndexNumber: 1,
             *  format: S1:E1 - {Name}
             */

            const name = np?.Name
            const seasonName = np?.SeasonName
            const SeriesName = np?.SeriesName
            const type = np?.Type

            // Handle type "Episode"
            if (type == "Episode") {
                if (seasonName?.includes("Season")) {
                    // TV Show
                    const seasonNumber = np?.ParentIndexNumber
                    const episodeNumber = np?.IndexNumber
                    obj.details = `🎬 S${seasonNumber}:E${episodeNumber} - ${name}`

                    if (seasonName && seasonName.length > 0) {
                        obj.state = `🍿 ${SeriesName}`
                    }
                } else {
                    // Episode without season
                    obj.details = `${name}`

                    if (seasonName && seasonName.length > 0) {
                        obj.state = `${SeriesName}`
                    } else {
                        obj.state = undefined
                    }
                }

            // Handle type "Movie"
            } else if (type == "Movie") {
                obj.details = `Watching a movie`
                obj.state = `${name}`

            // Handle type "Audio"
            } else if (type == "Audio") {
                const artist = np?.Artists?.length > 0 ? np?.Artists?.join(", ") : "Unknown Artist"

                obj.details = `🎵 ${name}`
                obj.state = `by ${artist}`

            // Fallback for other types
            } else {
                if (name) {
                    obj.details = `${name}`
                }
            }

            obj.smallImageKey = isPaused == true ? "paused" : "playing"
            obj.smallImageText = `${isPaused == true ? "Paused" : `Playing`}`
            obj.startTimestamp = isPaused == true ? undefined : startTime
            // obj.endTimestamp = isPaused == true ? undefined : endTime // doesnt work like expected. expecting a progress bar but got countdown instead

            // console.log(obj)

            // cut discord limits
            obj.details = obj.details?.substring(0, DISCORD_MAX_STRING_LENGTH)
            obj.state = obj.state?.substring(0, DISCORD_MAX_STRING_LENGTH)

            await DiscordRPC.setActivity(obj)
            console.log(`[${Tags.Discord}] Presence Updated.`)
        }
    }
}