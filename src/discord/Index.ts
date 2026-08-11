import { DatabaseService } from "../database/DatabaseService.js";
import { getNowPlaying } from "../jellyfin/Index.js";
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
            discord.updatePresence(jd);
        } else {
            discord.clearPresence();
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
