import { Client, SetActivity } from "@xhayper/discord-rpc";
import Tags from "../utils/Tags.js";

export class DiscordRPC {
    private client: Client;

    constructor(
        client: Client
    ) {
        this.client = client;
    }

    async updatePresence(presenceData: SetActivity): Promise<void> {
        if (!this.client.user) {
            throw new Error("Discord client is not ready. User is undefined.");
            return;
        }

        try {
            await this.client.user.setActivity(presenceData);
        } catch (e) {
            console.error(`[${Tags.Error}] Failed to update Discord presence: `, e);
        }
    }
}
