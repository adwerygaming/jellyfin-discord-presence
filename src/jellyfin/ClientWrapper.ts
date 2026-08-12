import { DatabaseService } from "../database/DatabaseService";
import { promptServerSetup } from "./functions/PromptServerSetup";
import { JellyfinService } from "./JellyfinService";

const db = new DatabaseService();
let serverCreds = await db.getServerInfo();

if (!serverCreds) {
    serverCreds = await promptServerSetup();
    // throw new ServerCredsNotFoundError();
}

export const jellyfin = new JellyfinService(serverCreds.BaseUrl, serverCreds.ApiKey);
