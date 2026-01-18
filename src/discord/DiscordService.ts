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
    /**
     * Update Discord Rich Presence based on Jellyfin now playing data. Main function to update RPC. Edit here for custom formatting.
     * @returns nothing
     */
    UpdateRPC: async () => {
        const mySession = await JellyfinService.User.GetMySession()

        if (mySession) { 
            const username = mySession?.UserName ?? "User"
            const np = mySession?.NowPlayingItem
            const ps = mySession?.PlayState
            const isPaused = ps?.IsPaused
            const clientName = mySession.Client // 'Jellyfin Web' or 'Jellyfin Android'

            const obj: Presence = {
                startTimestamp: undefined,
                endTimestamp: undefined,
                largeImageKey: "jellyfin_logo",
                largeImageText: `${clientName}`,
                details: undefined,
                state: undefined
            };

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

            const startTime = Date.now() - Math.floor(mySession?.PlayState?.PositionTicks / 10000);

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

            // cut discord limits
            obj.details = obj.details?.substring(0, DISCORD_MAX_STRING_LENGTH)
            obj.state = obj.state?.substring(0, DISCORD_MAX_STRING_LENGTH)

            await DiscordRPC.setActivity(obj)
            console.log(`[${Tags.Discord}] Presence Updated.`)
        }
    }
}