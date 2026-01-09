import { NowPlayingItem, SessionInfo, SessionsInfo } from "../types/jellyfin/SessionsInfo.js";
import Tags from "../utils/Tags.js";
import JellyfinAPI from "./Client.js";

interface GetUsersSessionsResult {
    count: number;
    users: SessionInfo[];
}

const JellyfinService = {
    // Get all active sessions
    async GetSessions(): Promise<SessionsInfo | null> {
        const response = await JellyfinAPI.get<SessionsInfo>("/Sessions", {
            validateStatus: () => true
        });

        if (response.status == 401) {
            console.log(`[${Tags.Jellyfin}] Failed to get sessions info: ${response.status}. Please update your jellyfin access token.`)
            return null
        }

        if (response.status != 200) {
            console.log(`[${Tags.Jellyfin}] Failed to get sessions info: ${response.status}`)
            return null
        }

        const data = response.data;

        return data
    },
    // Get session by user ID
    async GetSessionByUserID(UserId: string): Promise<SessionInfo | null> {
        const sessions = await this.GetSessions()

        if (!sessions) {
            return null
        }

        // console.log(`[${Tags.Debug}] User ID: ${UserId}`)
        const mySession = sessions?.find((x) => x.UserId == UserId) ?? null

        return mySession
    },
    // Get my session, using env variable JELLYFIN_TARGET_USERID
    async GetMySession(): Promise<SessionInfo | null> {
        const sessions = await this.GetSessions()
        const myUserID = process.env.JELLYFIN_TARGET_USERID

        if (!myUserID) {
            console.log(`[${Tags.System}] JELLYFIN_TARGET_USERID is empty! Please fill out on .env file!`)
            return null
        }

        if (!sessions) {
            return null
        }

        // console.log(`[${Tags.Debug}] User ID: ${myUserID}`)
        const mySession = sessions?.find((x) => x.UserId == myUserID) ?? null

        return mySession
    },
    // Get my now playing data, by me i meant using JELLYFIN_TARGET_USERID in env variable file
    async GetMyNowPlayingData(): Promise<NowPlayingItem | null> {
        const mySession = await this.GetMySession()

        if (!mySession) {
            console.log(`[${Tags.Jellyfin}] Couldn't find any active session. Try opening the Jellyfin app.`)
            return null
        }

        const NowPlayingItem = mySession.NowPlayingItem

        return NowPlayingItem
    },
    // Get all users sessions
    async GetUsersSessions(): Promise<GetUsersSessionsResult> {
        const sessions = await this.GetSessions()

        const output = {
            count: sessions?.length ?? 0,
            users: sessions ?? []
        }

        return output
    }
}

export default JellyfinService;