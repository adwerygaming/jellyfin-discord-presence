import { DatabaseService } from "../../database/DatabaseService";
import { ServerCredsNotFoundError } from "../../utils/Errors";
import { formatDuration } from "../../utils/FormatDuration";
import tags from "../../utils/Tags";
import { jellyfin } from "../ClientWrapper";
import { TICKS_TO_S } from "../Index";
import { getNowPlaying } from "./GetNowPlaying";
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

        const data = await getNowPlaying();

        const startTime = formatDuration(data?.positionTicks ? data.positionTicks / TICKS_TO_S : 0);
        const endTime = formatDuration(data?.runtimeTicks ? data.runtimeTicks / TICKS_TO_S : 0);

        const currentPlaybackPosString = `${startTime} / ${endTime}`;
        const currentChapterString = data?.currentChapter?.Name ? `• on ${data.currentChapter.Name}` : "";

        switch (data?.type) {
            case 'Episode':
                console.log(`[${tags.Jellyfin}] Series Name     : ${data.seriesName}`);
                console.log(`[${tags.Jellyfin}] Episode Name    : ${data.fullEpisodeString}`);
                console.log(`[${tags.Jellyfin}] Episode Details : ${data.fullSessionString}`);
                console.log(`[${tags.Jellyfin}] Overview        : ${data.item.Overview ?? "No overview available."}`);
                console.log(`[${tags.Jellyfin}] Position        : ${currentPlaybackPosString} ${currentChapterString}`);
                console.log(`[${tags.Jellyfin}] Series URL      : ${data.localShowUrl}`);
                break;

            case 'Movie':
                console.log(`[${tags.Jellyfin}] Movie Name      : ${data.fullMovieString}`);
                console.log(`[${tags.Jellyfin}] Year            : ${data.item.ProductionYear ?? 'N/A'}`);
                console.log(`[${tags.Jellyfin}] Genres          : ${data.genres}`);
                console.log(`[${tags.Jellyfin}] Rating          : ${data.item.OfficialRating ?? 'N/A'} • Community ${data.item.CommunityRating ?? 'N/A'} • Critic ${data.item.CriticRating ?? 'N/A'}`);
                console.log(`[${tags.Jellyfin}] Quality         : ${data.resolution} ${data.codec}`);
                console.log(`[${tags.Jellyfin}] Overview        : ${data.item.Overview && data.item.Overview.length > 100 ? data.item.Overview.slice(0, 100) + '...' : "No overview available."}`);
                console.log(`[${tags.Jellyfin}] Position        : ${currentPlaybackPosString} ${currentChapterString}`);
                console.log(`[${tags.Jellyfin}] Series URL      : ${data.localShowUrl}`);
                break;

            default:
                break;
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
