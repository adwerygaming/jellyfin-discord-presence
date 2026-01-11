import Tags from "../utils/Tags.js";
import JellyfinService from "./JellyfinService.js";

const JELLYFIN_URL = process.env.JELLYFIN_URL;
const JELLYFIN_TARGET_USERID = process.env.JELLYFIN_TARGET_USERID;

if (!JELLYFIN_URL) {
    console.log(`[${Tags.Jellyfin}] JELLYFIN_URL is missing on .env file. Please fill it out.`)
    process.exit(1)
}

if (!JELLYFIN_TARGET_USERID) {
    console.log(`[${Tags.Jellyfin}] JELLYFIN_TARGET_USERID is missing on .env file. Please fill it out.`)
    process.exit(1)
}

console.log(`[${Tags.Jellyfin}] Server Url: ${JELLYFIN_URL ?? "Unknown"}`);

const serverinfo = await JellyfinService.Server.GetServerInfo();
console.log(`[${Tags.Jellyfin}] Connected to ${serverinfo?.ServerName ?? "Unknown Server Name"} running v${serverinfo?.Version ?? "Unknown Version"}.`);

const users = await JellyfinService.Server.GetAllUsers();
if (users && users.length > 0) {
    console.log(`[${Tags.Jellyfin}] Found ${users.length} users on the server.`)

    const targetUser = users.filter((x) => x.Id == JELLYFIN_TARGET_USERID)?.[0];

    if (targetUser) {
        console.log(`[${Tags.Jellyfin}] Currently tracking user: ${targetUser.Name}`);
    } else {
        console.log(`[${Tags.Jellyfin}] Couldn't find the target user with ID: ${JELLYFIN_TARGET_USERID}`);
    }
} else {
    console.log(`[${Tags.Jellyfin}] There is no users on the server.`)
}