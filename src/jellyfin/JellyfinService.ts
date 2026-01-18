import { NowPlayingItem, SessionInfo, SessionsInfo } from "../types/jellyfin/Sessions/Info/SessionsInfo.js";
import { SystemInfo } from "../types/jellyfin/System/Info/SystemInfo.js";
import { Users } from "../types/jellyfin/Users/Users.js";
import Tags from "../utils/Tags.js";
import JellyfinAPI from "./Client.js";

interface GetUsersSessionsResult {
    count: number;
    users: SessionInfo[];
}

const JellyfinService = {
    Server: {
        /**
         * Get server info (from backend (server), not the public one)
         * @returns SystemInfo | null - system info object or null on failure
         */
        async GetServerInfo(): Promise<SystemInfo | null> {
            const response = await JellyfinAPI.get<SystemInfo>("/System/Info", {
                validateStatus: () => true
            });

            if (response.status == 401) {
                console.log(`[${Tags.Jellyfin}] Failed to get server info: ${response.status}. Please update your jellyfin access token.`)
                return null
            }

            if (response.status != 200) {
                console.log(`[${Tags.Jellyfin}] Failed to get server info: ${response.status}`)
                return null
            }

            return response.data
        },

        /**
         * Get all users from backend view (all users)
         * @returns Users | null - users object or null on failure
         */
        async GetAllUsers(): Promise<Users | null> {
            const response = await JellyfinAPI.get<Users>("/Users", {
                validateStatus: () => true
            });

            if (response.status == 401) {
                console.log(`[${Tags.Jellyfin}] Failed to get users info: ${response.status}. Please update your jellyfin access token.`)
                return null
            }

            if (response.status != 200) {
                console.log(`[${Tags.Jellyfin}] Failed to get users info: ${response.status}`)
                return null
            }

            return response.data
        }
    },
    Session: {
        /**
         * Get all active sessions from backend view (sessions across all users). Note that 1 user can have multiple sessions.
         * @returns SessionsInfo | null - sessions info object or null on failure
         */
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

        /**
         * Get session by user ID
         * @param UserId The user ID to get session for
         * @returns SessionInfo | null - User's session info object or null if not found
         */
        async GetSessionByUserID(UserId: string): Promise<SessionInfo | null> {
            const sessions = await this.GetSessions()

            if (!sessions) {
                return null
            }

            // console.log(`[${Tags.Debug}] User ID: ${UserId}`)
            const mySession = sessions?.find((x) => x.UserId == UserId) ?? null

            return mySession
        }
    },
    User: {
        /**
         * Get my session, using userID from env JELLYFIN_TARGET_USERID. Note 1 user can have multiple sessions, this function will return the first found session.
         * @returns SessionInfo | null - my session info object or null if not found
         */
        async GetMySession(): Promise<SessionInfo | null> {
            const sessions = await JellyfinService.Session.GetSessions()
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
        /**
         * Get my now playing, using userID from JELLYFIN_TARGET_USERID in env variable file
         * @returns NowPlayingItem | null - my now playing item or null if not found
         */
        async GetMyNowPlayingData(): Promise<NowPlayingItem | null> {
            const mySession = await this.GetMySession()

            if (!mySession) {
                console.log(`[${Tags.Jellyfin}] Couldn't find any active session. Try opening the Jellyfin app.`)
                return null
            }

            const NowPlayingItem = mySession.NowPlayingItem

            return NowPlayingItem
        },
        /**
         * Get all users sessions from backend view
         * @returns GetUsersSessionsResult - object containing count and array of users' session info
         */
        async GetUsersSessions(): Promise<GetUsersSessionsResult> {
            const sessions = await JellyfinService.Session.GetSessions()

            const output = {
                count: sessions?.length ?? 0,
                users: sessions ?? []
            }

            return output
        }
    }
}

export default JellyfinService;