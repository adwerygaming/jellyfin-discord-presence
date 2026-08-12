import { DatabaseService } from "../../database/DatabaseService";
import { ServerCredsNotFoundError } from "../../utils/Errors";
import { formatDuration } from "../../utils/FormatDuration";
import tags from "../../utils/Tags";
import { jellyfin } from "../ClientWrapper";
import { TICKS_TO_MS } from "../Index";
import { getCurrentChapter } from "./GetCurrentChapter";
import { pressAnyKeyToContinue } from "./PressAnyKeyToContinue";
import { promptServerSetup } from "./PromptServerSetup";

const db = new DatabaseService();

const settings = await db.getSettings();
const updateInterval = settings.updateInterval;

export async function updateProgress(): Promise<void> {
    const serverCreds = await db.getServerInfo();
    console.clear();

    try {
        const connTest = await jellyfin.testConnection();

        if (!connTest) {
            console.error(`[${tags.Error}] Failed to connect to the Jellyfin server. Please check your base URL and API key.`);
            return;
        }

        console.log(`[${tags.Jellyfin}] Using Jellyfin server: ${serverCreds?.BaseUrl} (v${connTest.ServerVersion})`);
        console.log(`[${tags.Jellyfin}] Update interval: ${updateInterval / 1000}s`);
        console.log("");

        const sessions = await jellyfin.getMyActiveSessions();

        console.log(`[${tags.Jellyfin}] Tracking user: ${sessions[0]?.UserName} (${sessions[0]?.UserId})`);
        console.log(`[${tags.Jellyfin}] ------------------------------------------------`);
        console.log("");

        if (sessions.length === 0) {
            console.log(`[${tags.Jellyfin}] No active sessions found.`);
            return;
        }

        if (sessions.length > 1) {
            console.log(`[${tags.Info}] You have ${sessions.length} active sessions. Tracking the first one that is playing.`);
            console.log("");
        }

        for (let i = 0; i < sessions.length; i++) {
            const session = sessions[i];
            const np = session.NowPlayingItem;

            if (sessions.length > 1) {
                console.log(`[${tags.Jellyfin}] Session #${i + 1} [${session.DeviceName} - ${session.ApplicationVersion}] ${i == 0 ? "<-- (Tracking this one)" : ""}`);
                console.log(`[${tags.Jellyfin}] ------------------------------------------------`);
            }

            if (np) {
                const episodeName = np.Name;
                const seriesName = np.SeriesName;
                const parentShowId = np.ParentId;
                const serverId = session.ServerId;
                const showType = np.Type;

                const positionTicks = session.PlayState?.PositionTicks ?? 0;
                const runtimeTicks = session.NowPlayingItem?.RunTimeTicks ?? 0;

                const positionMs = positionTicks / TICKS_TO_MS;
                const runtimeMs = runtimeTicks / TICKS_TO_MS;

                const episodeIndex = np.IndexNumber;
                const seasonIndex = np.ParentIndexNumber;

                const chapters = np.Chapters ?? [];
                const currentChapter = getCurrentChapter(chapters, positionTicks);

                // console.log(chapters);
                // console.log(currentChapter);
                // console.log(`[${tags.Debug}] Position Ticks: ${positionTicks}`);

                const seriesUrl = `${serverCreds?.BaseUrl}/web/#/details?id=${parentShowId}&serverId=${serverId}`;

                console.log(`[${tags.Jellyfin}] Currently Playing`);

                switch (showType) {
                    case 'Episode': {
                        console.log(`[${tags.Jellyfin}] Series Name     : ${seriesName}`);
                        console.log(`[${tags.Jellyfin}] Episode Name    : ${episodeName}`);
                        console.log(`[${tags.Jellyfin}] Episode Details : Season ${seasonIndex}, Episode ${episodeIndex}`);
                        console.log(`[${tags.Jellyfin}] Overview        : ${np.Overview ?? "No overview available."}`);
                        console.log(`[${tags.Jellyfin}] Position        : ${formatDuration(positionMs / 1000)} / ${formatDuration(runtimeMs / 1000)} ${currentChapter?.Name ? `• ${currentChapter.Name}` : ""}`);
                        console.log(`[${tags.Jellyfin}] Series URL      : ${seriesUrl}`);

                        break;
                    }

                    case 'Audio':
                        break;

                    case 'Movie': {
                        // console.log(np);

                        const videoStream = np.MediaStreams?.find(s => s.Type === 'Video');
                        const resolution = videoStream ? `${videoStream.Width}x${videoStream.Height}` : 'N/A';
                        const codec = videoStream?.Codec?.toUpperCase() ?? 'N/A';
                        const genres = np.Genres?.join(', ') || 'N/A';

                        console.log(`[${tags.Jellyfin}] Movie Name      : ${episodeName}`);
                        console.log(`[${tags.Jellyfin}] Year            : ${np.ProductionYear ?? 'N/A'}`);
                        console.log(`[${tags.Jellyfin}] Genres          : ${genres}`);
                        console.log(`[${tags.Jellyfin}] Rating          : ${np.OfficialRating ?? 'N/A'} • Community ${np.CommunityRating ?? 'N/A'} • Critic ${np.CriticRating ?? 'N/A'}`);
                        console.log(`[${tags.Jellyfin}] Quality         : ${resolution} ${codec}`);
                        console.log(`[${tags.Jellyfin}] Overview        : ${np.Overview && np.Overview.length > 100 ? np.Overview.slice(0, 100) + '...' : "No overview available."}`);
                        console.log(`[${tags.Jellyfin}] Position        : ${formatDuration(positionMs / 1000)} / ${formatDuration(runtimeMs / 1000)} ${currentChapter?.Name ? `• on ${currentChapter.Name}` : ""}`);
                        console.log(`[${tags.Jellyfin}] Series URL      : ${seriesUrl}`);
                        break;
                    }
                    default:
                        console.error(`[${tags.Error}] Unhandled show type: ${showType}`);
                        break;
                }

            } else {
                console.log(`[${tags.Jellyfin}] Currently not playing anything at the moment.`);
            }

            console.log("");
        }
    } catch (e) {
        if (e instanceof ServerCredsNotFoundError) {
            await promptServerSetup();
        } else {
            console.error(`[${tags.Error}] An error occurred while updating progress:`, e);
            await pressAnyKeyToContinue();
        }
    }
}
