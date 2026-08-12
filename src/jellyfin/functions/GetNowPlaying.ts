import { SetActivity } from "@xhayper/discord-rpc";
import { ActivityType } from 'discord-api-types/v10';
import { ServerCredsNotFoundError } from "../../utils/Errors";
import tags from "../../utils/Tags";
import { jellyfin } from "../ClientWrapper";
import { TICKS_TO_MS } from "../Index";
import { getCurrentChapter } from "./GetCurrentChapter";
import { promptServerSetup } from "./PromptServerSetup";

export async function getNowPlaying(): Promise<SetActivity | null> {
    try {
        const myActiveSessions = await jellyfin.getMyActiveSessions();
        const myActiveSession = myActiveSessions.length > 0 ? myActiveSessions[0] : null;

        if (myActiveSession) {
            const np = myActiveSession.NowPlayingItem;

            if (np) {
                const episodeName = np.Name;
                const seriesName = np.SeriesName ?? np.Name;
                const showType = np.Type;
                // const externalUrl = np.ExternalUrls?.find(d => d.Url);
                // const parentShowId = np.ParentId;
                const seasonId = np.SeasonId;

                const positionTicks = myActiveSession.PlayState?.PositionTicks ?? 0;
                const runtimeTicks = myActiveSession.NowPlayingItem?.RunTimeTicks ?? 0;

                const positionMs = positionTicks / TICKS_TO_MS;
                const runtimeMs = runtimeTicks / TICKS_TO_MS;

                const startTimestamp = Date.now() - positionMs;
                const endTimestamp = startTimestamp + runtimeMs;

                const showUrl = np.ExternalUrls?.find(d => d.Url)?.Url ?? undefined;

                let results: SetActivity | null = null;

                // console.log(np);

                switch (showType) {
                    case 'Episode': {
                        const episodeIndex = np.IndexNumber;
                        const seasonIndex = np.ParentIndexNumber;

                        // show chapters
                        const chapters = np.Chapters ?? [];
                        const currentChapter = getCurrentChapter(chapters, positionTicks);

                        const fullEpisodeString = episodeName ?? "Unknown Episode";
                        const fullSessionString = `S${seasonIndex}:E${episodeIndex} ${currentChapter?.Name ? `• ${currentChapter.Name}` : ""}`;

                        const showCoverArtUrl = await jellyfin.getShowCoverArtUrl(seasonId);

                        results = ({
                            name: seriesName ?? "Jellyfin",
                            type: ActivityType.Watching,
                            details: fullEpisodeString,
                            state: fullSessionString,
                            url: showUrl,
                            largeImageKey: showCoverArtUrl ?? undefined,
                            startTimestamp,
                            endTimestamp,
                        });

                        break;
                    }

                    case 'Audio':
                        break;

                    case 'Movie': {
                        const fullMovieString = `${episodeName ?? "Unknown Movie"} ${np.ProductionYear ? `(${np.ProductionYear})` : ""}`;
                        const showCoverArtUrl = await jellyfin.getShowCoverArtUrl(np.Id ?? np.ParentId ?? null);

                        results = ({
                            name: seriesName ?? "Jellyfin",
                            type: ActivityType.Watching,
                            details: fullMovieString,
                            url: showUrl,
                            largeImageKey: showCoverArtUrl ?? undefined,
                            startTimestamp,
                            endTimestamp,
                        });
                        break;
                    }

                    default:
                        console.error(`[${tags.Error}] Unhandled show type: ${showType}`);
                        break;
                }

                return results;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (e) {
        if (e instanceof ServerCredsNotFoundError) {
            await promptServerSetup();
        }
        
        console.error(`[${tags.Error}] Failed to get now playing information.`);
        return null;
    }
}
