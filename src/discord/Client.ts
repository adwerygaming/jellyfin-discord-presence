import { Client } from "@xhayper/discord-rpc";
import { env } from "../utils/EnvManager.js";

const clientId = env.DISCORD_CLIENT_ID;

if (!clientId) {
    throw new Error("DISCORD_CLIENT_ID is not set in the environment variables.");
}

export const client = new Client({
    clientId
});
