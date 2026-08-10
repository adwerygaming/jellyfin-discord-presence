import { confirm, input, select } from '@inquirer/prompts';
import { DatabaseService, ServerInfo } from '../database/DatabaseService.js';
import tags from '../utils/Tags.js';
import { JellyfinService } from './JellyfinService.js';

const db = new DatabaseService();

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

                    const serverInfo = await db.updateServerInfo({ BaseUrl: baseUrl, ApiKey: apiKey });
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
const connTest = await jellyfin.testConnection();

console.log(`[${tags.System}] Using Jellyfin server: ${serverCreds.BaseUrl} (v${connTest?.ServerVersion})`);
console.log("");

async function promptAccountToTrack(): Promise<void> {
    while (true) {
        console.clear();
        const sessions = await jellyfin.getSessions();

        console.log(`[${tags.Jellyfin}] Please select a user to track from the following active sessions:`);
        const users = sessions.map(session => {
            return {
                name: `${session.UserName} (${session.UserId})`,
                value: session.UserId,
                description: `Server: ${session.ServerId} | From: ${session.RemoteEndPoint}, Device: ${session.DeviceName}, App: ${session.ApplicationVersion}`,
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


