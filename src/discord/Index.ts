import { SetActivity } from "@xhayper/discord-rpc";
import { ActivityType } from 'discord-api-types/v10';
import { DatabaseService } from "../database/DatabaseService.js";
import { getNowPlaying } from "../jellyfin/functions/GetNowPlaying";
import Tags from "../utils/Tags.js";
import { client } from "./Client.js";
import { DiscordRPC } from "./DiscordRPC.js";

const db = new DatabaseService();

const settings = await db.getSettings();
const updateInterval = settings.updateInterval;

const discord = new DiscordRPC(client);

client.on('ready', () => {
    const user = client.user;

    if (!user) {
        console.error(`[${Tags.Discord}] Discord client is not ready. User is undefined.`);
        return;
    }

    console.log(`[${Tags.Discord}] Discord RPC connected as ${user.username} (${user.id})`);

    async function updatePresence(): Promise<void> {
        const jd = await getNowPlaying();

        if (jd) {
            let presenceData: SetActivity = {
                startTimestamp: jd.startTimestamp,
                endTimestamp: jd.endTimestamp,
                smallImageKey: 'jellyfin_logo',
                smallImageText: 'Jellyfin',
            };

            switch (jd.type) {
                case 'Episode':
                    presenceData = {
                        type: ActivityType.Watching,
                        name: jd.seriesName ?? "Jellyfin",
                        details: jd.fullEpisodeString,
                        state: jd.fullSessionString,
                        largeImageKey: jd.showCoverArtUrl ?? 'jellyfin_logo',
                        largeImageText: jd.seriesName ?? "Jellyfin",
                        startTimestamp: jd.startTimestamp,
                        endTimestamp: jd.endTimestamp,
                    };
                    break;

                case 'Movie':
                    presenceData = {
                        type: ActivityType.Watching,
                        name: jd.seriesName ?? "Jellyfin",
                        details: jd.fullMovieString,
                        largeImageKey: jd.showCoverArtUrl ?? 'jellyfin_logo',
                        startTimestamp: jd.startTimestamp,
                        endTimestamp: jd.endTimestamp,
                    };
                    break;

                default:
                    break;
            }

            discord.updatePresence(presenceData);
        } else {
            // discord.clearPresence();
        }
    }

    setInterval(() => {
        (async (): Promise<void> => {
            await updatePresence();
        })();
    }, updateInterval);

    (async (): Promise<void> => {
        await updatePresence();
    })();
});

client.on("error", (e) => {
    console.log(`[${Tags.Discord}] Discord PRC Failure.`);
    console.error(e);
});

console.log(`[${Tags.Discord}] Connecting to Discord RPC...`);

try {
    client.login();
} catch (e) {
    console.log(`[${Tags.Discord}] Failed to login Discord PRC.`);
    console.error(e);
}
