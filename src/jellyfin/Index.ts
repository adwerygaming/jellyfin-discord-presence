/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { confirm, input, select } from '@inquirer/prompts';
import { SetActivity } from '@xhayper/discord-rpc';
import { ActivityType } from "discord-api-types/v10";
import { DatabaseService, ServerInfo } from '../database/DatabaseService.js';
import tags from '../utils/Tags.js';
import { JellyfinService } from './JellyfinService.js';

const db = new DatabaseService();
const TICKS_TO_MS = 10000;

async function pressAnyKeyToContinue(): Promise<void> {
    await input({
        message: 'Press any key to continue...',
    });
}

async function promptServerSetup(): Promise<ServerInfo> {
    while (true) {
        const serverInfo = await db.getServerInfo();

        if (!serverInfo) {
            console.clear();

            console.log(`[${tags.System}] Welcome to Jellyfin Discord Presence! Let's set up your Jellyfin server connection.`);
            const baseUrl = await input({
                message: 'Enter your Jellyfin server base URL (e.g., http://localhost:8096):',
                validate: (value) => {
                    if (!value) {
                        return 'Base URL cannot be empty.';
                    }

                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return 'Please enter a valid URL.';
                    }
                },
                default: 'http://localhost:8096',
            });

            console.log(`[${tags.Info}] You can get your Jellyfin Server API key from ${baseUrl}/web/#/dashboard/keys`);
            const apiKey = await input({
                message: 'Enter your Jellyfin Server API key:',
                validate: (value) => {
                    if (!value) {
                        return 'API key cannot be empty.';
                    }
                    return true;
                },
            });

            const confirmPublicUrl = await confirm({
                message: 'Do you want to configure Jellyfin public url? (for cover art to show up)',
                default: false,
            });

            let publicBaseUrl: string | null = null;
            if (confirmPublicUrl) {
                console.log(`[${tags.System}] To show the show image cover art, you need to put Jellyfin on public (example: using cloudflare)`);
                publicBaseUrl = await input({
                    message: 'Enter your Jellyfin server public base URL (e.g., https://streaming.yourdomain.com):',
                    default: baseUrl,
                    validate: (value) => {
                        if (!value) {
                            return 'Public base URL cannot be empty.';
                        }

                        try {
                            new URL(value);
                            return true;
                        } catch {
                            return 'Please enter a valid URL.';
                        }
                    },
                });

                const jellyfin = new JellyfinService(publicBaseUrl, apiKey);
                const connTest = await jellyfin.testConnection();

                if (!connTest) {
                    console.error(`[${tags.Error}] Failed to connect to the Jellyfin server. Please check your base URL and API key.`);
                    await pressAnyKeyToContinue();
                    continue;
                }

                console.log(`[${tags.System}] Success. Public base URL connection can be reached.`);
                await pressAnyKeyToContinue();
            }

            try {
                const jellyfin = new JellyfinService(baseUrl, apiKey);
                const connTest = await jellyfin.testConnection();

                if (!connTest) {
                    console.error(`[${tags.Error}] Failed to connect to the Jellyfin server. Please check your base URL and API key.`);
                    await pressAnyKeyToContinue();
                    continue;
                } else {
                    console.log(`[${tags.System}] Connected to ${baseUrl}`);
                    console.log(`------------------------------------------------`);
                    console.log(`[${tags.System}] Server ID: ${connTest.ServerId}`);
                    console.log(`[${tags.System}] Remote End Point: ${connTest.RemoteEndPoint}`);
                    console.log(`[${tags.System}] Jellyfin Version: ${connTest.ServerVersion}`);
                    console.log(`------------------------------------------------`);

                    const serverInfo = await db.updateServerInfo({ 
                        BaseUrl: baseUrl, 
                        PublicBaseUrl: publicBaseUrl ?? null,
                        ApiKey: apiKey });
                    console.log(`[${tags.System}] Jellyfin server connection saved successfully!`);
                    return serverInfo;
                }
            } catch (e) {
                console.error(`[${tags.Error}] Failed to save Jellyfin server connection.`, e);
                continue;
            }
        }

        return serverInfo;
    }
}

let serverCreds = await db.getServerInfo();
if (!serverCreds) {
    serverCreds = await promptServerSetup();
}

const jellyfin = new JellyfinService(serverCreds.BaseUrl, serverCreds.ApiKey);

async function promptAccountToTrack(): Promise<void> {
    while (true) {
        console.clear();
        const sessions = await jellyfin.getSessions();

        if (sessions.length === 0) {
            console.log(`[${tags.Jellyfin}] No active sessions found. Please open Jellyfin on one of your devices and try again.`);
            await pressAnyKeyToContinue();
            continue;
        }

        console.log(`[${tags.Jellyfin}] Please select a user to track from the following active sessions:`);

        const tempSessionMap = new Map<string, string>();

        for (const session of sessions) {
            if (!session.UserId || !session.UserName) {
                console.error(`[${tags.Error}] Session missing UserId or UserName. Skipping this session.`);
                continue;
            }

            if (!tempSessionMap.has(session.UserId)) {
                tempSessionMap.set(session.UserId, session.UserName);
            }
        }

        const users = Array.from(tempSessionMap.entries()).map(([userId, userName]) => {
            return {
                name: `${userName} (${userId})`,
                value: userId
            };
        });

        const answer = await select({
            message: 'Select a user to track:',
            choices: users,
        });

        const selectedSession = sessions.find(session => session.UserId === answer);
        if (!selectedSession) {
            console.error(`[${tags.Error}] Selected session not found. Please try again.`);
            await pressAnyKeyToContinue();
            continue;
        }

        const confirmation = await confirm({
            message: `Are you sure you want to track ${selectedSession.UserName}?`,
            default: true,
        });

        if (!confirmation) {
            console.log(`[${tags.Jellyfin}] Ok, let's try again.`);
            await pressAnyKeyToContinue();
            continue;
        }

        try {
            await db.updateMe(selectedSession);
            console.log(`[${tags.Jellyfin}] Successfully saved ${selectedSession.UserName} as the user to track.`);
            await pressAnyKeyToContinue();
            break;
        } catch (e) {
            console.error(`[${tags.Error}] Failed to save selected user.`, e);
            await pressAnyKeyToContinue();
            continue;
        }
    }
}

const savedMe = await db.getMe();
if (!savedMe) {
    await promptAccountToTrack();
}

const settings = await db.getSettings();
const updateInterval = settings.updateInterval;

setInterval(() => {
    (async (): Promise<void> => {
        console.clear();
        const connTest = await jellyfin.testConnection();

        if (!connTest) {
            console.error(`[${tags.Error}] Failed to connect to the Jellyfin server. Please check your base URL and API key.`);
            return;
        }

        console.log(`[${tags.Jellyfin}] Using Jellyfin server: ${serverCreds.BaseUrl} (v${connTest?.ServerVersion})`);
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
                const lastChapter = chapters.length > 0 ? chapters[chapters.length - 1] : null;
                const currentChapter = chapters.find(ch => {
                    if (ch.StartPositionTicks && ch.StartPositionTicks >= positionTicks && lastChapter?.StartPositionTicks && ch.StartPositionTicks <= lastChapter?.StartPositionTicks) {
                        return ch;
                    } else {
                        return null;
                    }
                });

                // console.log(chapters);
                // console.log(currentChapter);
                // console.log(`[${tags.Debug}] Position Ticks: ${positionTicks}`);

                const seriesUrl = `${serverCreds.BaseUrl}/web/#/details?id=${parentShowId}&serverId=${serverId}`;

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
                        console.log(`[${tags.Jellyfin}] Overview        : ${np?.Overview && np.Overview.length > 100 ? np.Overview.slice(0, 100) + '...' : "No overview available."}`);
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
    })();
}, updateInterval);

export async function getNowPlaying(): Promise<SetActivity | null> {
    try {
        const myActiveSessions = await jellyfin.getMyActiveSessions();
        const myActiveSession = myActiveSessions.length > 0 ? myActiveSessions[0] : null;

        if (myActiveSession) {
            const np = myActiveSession.NowPlayingItem;

            if (np) {
                const episodeName = np.Name;
                const seriesName = np.SeriesName;
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
                        const lastChapter = chapters.length > 0 ? chapters[chapters.length - 1] : null;
                        const currentChapter = chapters.find(ch => {
                            if (ch.StartPositionTicks && ch.StartPositionTicks >= positionTicks && lastChapter?.StartPositionTicks && ch.StartPositionTicks <= lastChapter?.StartPositionTicks) {
                                return ch;
                            } else {
                                return null;
                            }
                        });

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
                        const showCoverArtUrl = await jellyfin.getShowCoverArtUrl(np?.Id ?? np?.ParentId ?? null);

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
    } catch {
        console.error(`[${tags.Error}] Failed to get now playing information.`);
        return null;
    }
}

function formatDuration(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const minsStr = mins.toString().padStart(2, "0");
    const secsStr = secs.toString().padStart(2, "0");

    if (hrs > 0) {
        return `${hrs}:${minsStr}:${secsStr}`;
    }
    return `${minsStr}:${secsStr}`;
}
