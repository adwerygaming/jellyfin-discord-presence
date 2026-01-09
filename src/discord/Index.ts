import Tags from "../utils/Tags.js";
import DiscordRPC from "./Client.js";
import { DiscordService } from "./DiscordService.js";

const updateInterval = 1000 * 15 // Interval in seconds. I suggest putting around >15s
const clientId = process.env.DISCORD_CLIENT_ID

if (!clientId) {
    console.log(`[${Tags.System}] DISCORD_CLIENT_ID is missing on .env file. Please fill it out.`)
    process.exit(1)
}

DiscordRPC.on('ready', async () => {
    console.log(`[${Tags.Discord}] Connected to Discord as ${DiscordRPC?.user?.username ?? "Unknown Username"} (${DiscordRPC?.user?.id ?? "Unknown User ID"}).`);

    setInterval(async () => {
        await DiscordService.UpdateRPC()
    }, updateInterval);

    await DiscordService.UpdateRPC()
});

DiscordRPC.on("error", (e) => {
    console.log(`[${Tags.Discord}] Discord PRC Failure.`);
    console.error(e)
})

console.log(`[${Tags.Discord}] Connecting to Discord RPC...`);

try {
    DiscordRPC.login({ clientId })
} catch (e) {
    console.log(`[${Tags.Discord}] Failed to login Discord PRC.`);
    console.error(e)
}