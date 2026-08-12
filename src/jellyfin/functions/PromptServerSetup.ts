/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { confirm, input } from "@inquirer/prompts";
import { DatabaseService, ServerInfo } from "../../database/DatabaseService";
import tags from "../../utils/Tags";
import { JellyfinService } from "../JellyfinService";
import { pressAnyKeyToContinue } from "./PressAnyKeyToContinue";

const db = new DatabaseService();

export async function promptServerSetup(): Promise<ServerInfo> {
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
