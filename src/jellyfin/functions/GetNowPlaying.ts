import { BaseItemDto, ChapterInfo, SessionInfoDto } from "@jellyfin/sdk/lib/generated-client/index";
import { DatabaseService } from "../../database/DatabaseService";
import { ServerCredsNotFoundError } from "../../utils/Errors";
import tags from "../../utils/Tags";
import { jellyfin } from "../ClientWrapper";
import { TICKS_TO_MS } from "../Index";
import { getCurrentChapter } from "./GetCurrentChapter";
import { promptServerSetup } from "./PromptServerSetup";

const db = new DatabaseService();
const serverCreds = await db.getServerInfo();

interface NowPlayingBaseItem {
    type: 'Episode' | 'Movie';
    item: BaseItemDto;
    session: SessionInfoDto;
    
    showUrl?: string | null;
    localShowUrl: string | null;
    
    showCoverArtUrl: string | null;
    currentChapter?: ChapterInfo

    positionTicks: number;
    runtimeTicks: number;
    startTimestamp: number;
    endTimestamp: number;

    resolution: string | null;
    codec: string | null;
    genres: string | null;
}

interface NowPlayingEpisodeItem extends NowPlayingBaseItem {
    type: 'Episode';
    seriesName: string | null;
    fullEpisodeString: string;
    fullSessionString: string;
}

interface NowPlayingMovieItem extends NowPlayingBaseItem {
    type: 'Movie';
    seriesName: string | null;
    fullMovieString: string;
}

type NowPlayingItem = NowPlayingEpisodeItem | NowPlayingMovieItem;

export async function getNowPlaying(): Promise<NowPlayingItem | null> {

    try {
        const activeSessions = await jellyfin.getMyActiveSessions();
        const activeSession = activeSessions.length > 0 ? activeSessions[0] : null;

        if (activeSession) {
            const np = activeSession.NowPlayingItem;

            if (np) {
                const episodeName = np.Name;
                const seriesName = np.SeriesName ?? np.Name ?? null;
                const showType = np.Type;
                const parentShowId = np.ParentId;
                const seasonId = np.SeasonId;
                
                const serverId = activeSession.ServerId;
                const positionTicks = activeSession.PlayState?.PositionTicks ?? 0;
                const runtimeTicks = activeSession.NowPlayingItem?.RunTimeTicks ?? 0;

                const positionMs = positionTicks / TICKS_TO_MS;
                const runtimeMs = runtimeTicks / TICKS_TO_MS;

                const startTimestamp = Date.now() - positionMs;
                const endTimestamp = startTimestamp + runtimeMs;

                const showUrl = np.ExternalUrls?.find(d => d.Url)?.Url ?? undefined;
                const localShowUrl = `${serverCreds?.BaseUrl}/web/#/details?id=${parentShowId}&serverId=${serverId}`;

                const chapters = np.Chapters ?? [];
                const currentChapter = getCurrentChapter(chapters, positionTicks) ?? undefined;

                const videoStream = np.MediaStreams?.find(s => s.Type === 'Video');
                const resolution = videoStream ? `${videoStream.Width}x${videoStream.Height}` : null;
                const codec = videoStream?.Codec?.toUpperCase() ?? null;
                const genres = np.Genres?.join(', ') || null;

                let results: NowPlayingItem | null = null;

                // console.log(np);

                switch (showType) {
                    case 'Episode': {
                        const episodeIndex = np.IndexNumber;
                        const seasonIndex = np.ParentIndexNumber;

                        const fullEpisodeString = episodeName ?? "Unknown Episode";
                        const fullSessionString = `S${seasonIndex}:E${episodeIndex} ${currentChapter?.Name ? `• ${currentChapter.Name}` : ""}`;

                        const showCoverArtUrl = await jellyfin.getShowCoverArtUrl(seasonId);

                        results = ({
                            type: 'Episode',
                            item: np,
                            session: activeSession,
                            
                            seriesName,
                            fullEpisodeString,
                            fullSessionString,

                            showUrl,
                            localShowUrl,
                            showCoverArtUrl,
                            currentChapter,
                            
                            positionTicks,
                            runtimeTicks,
                            startTimestamp,
                            endTimestamp,
                            
                            resolution,
                            codec,
                            genres
                        });
                        break;
                    }

                    case 'Audio':
                        console.log(`[${tags.Info}] Audio type is currently not handled.`);
                        break;

                    case 'Movie': {
                        const fullMovieString = `${episodeName ?? "Unknown Movie"} ${np.ProductionYear ? `(${np.ProductionYear})` : ""}`;
                        const showCoverArtUrl = await jellyfin.getShowCoverArtUrl(np.Id ?? np.ParentId ?? null);

                        results = ({
                            type: 'Movie',
                            item: np,
                            session: activeSession,

                            seriesName,
                            fullMovieString,
                            
                            showUrl,
                            localShowUrl,
                            showCoverArtUrl,
                            
                            startTimestamp,
                            endTimestamp,
                            positionTicks,
                            runtimeTicks,
                            
                            codec,
                            resolution,
                            genres,
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
        
        console.error(`[${tags.Error}] Failed to get now playing information.`, e);
        return null;
    }
}
