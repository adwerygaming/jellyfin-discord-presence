import Tags from "../utils/Tags.js";
import { client } from "./Client.js";

const updateInterval = 1000 * 15; // Interval in seconds. I suggest putting around >15s

client.on('ready', () => {
    
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
