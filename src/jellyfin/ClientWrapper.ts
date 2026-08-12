import { DatabaseService } from "../database/DatabaseService";
import { ServerCredsNotFoundError } from "../utils/Errors";
import { JellyfinService } from "./JellyfinService";

const db = new DatabaseService();
const serverCreds = await db.getServerInfo();

if (!serverCreds) {
    throw new ServerCredsNotFoundError();
}

export const jellyfin = new JellyfinService(serverCreds.BaseUrl, serverCreds.ApiKey);
