import { getNowPlaying } from "../jellyfin/Index.js";
import Tags from "../utils/Tags.js";
import { client } from "./Client.js";
import { DiscordRPC } from "./DiscordService.js";

const updateInterval = 1000 * 15; // Interval in seconds. I suggest putting around >15s

const discord = new DiscordRPC(client);

client.on('ready', () => {
    const user = client.user;

    if (!user) {
        console.error(`[${Tags.Discord}] Discord client is not ready. User is undefined.`);
        return;
    }

    console.log(`[${Tags.Discord}] Discord RPC connected as ${user.username} (${user.id})`);

    setInterval(() => {
        (async (): Promise<void> => {
            const jd = await getNowPlaying();

            if (jd) {
                discord.updatePresence(jd);
            } else {
                discord.clearPresence();
            }
        })();
    }, updateInterval);
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
