import { Api } from "@jellyfin/sdk";
import { SessionApi, SessionInfoDto } from "@jellyfin/sdk/lib/generated-client/index.js";
import { getSessionApi } from "@jellyfin/sdk/lib/utils/api/index.js";
import { DatabaseService } from "../database/DatabaseService.js";
import { jellyfin } from "./Client.js";

const db = new DatabaseService();

interface TestConnectionResult {
  ServerId: string;
  RemoteEndPoint: string;
  ServerVersion: string;
}

export class JellyfinService {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    baseUrl: string,
    apiKey: string
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async createClient(): Promise<Api> {
    return jellyfin.createApi(this.baseUrl, this.apiKey);
  }

  private async getSession(): Promise<SessionApi> {
    const client = await this.createClient();
    return getSessionApi(client);
  }

  async testConnection(): Promise<TestConnectionResult | null> {
    try {
      const sessions = await this.getSessionInfo();
      const session = sessions.find(session => session.IsActive);

      if (!session) {
        return null;
      }

      return {
        ServerId: session.ServerId || 'Unknown',
        RemoteEndPoint: session.RemoteEndPoint || 'Unknown',
        ServerVersion: session.ApplicationVersion || 'Unknown'
      };
    } catch (e) {
      console.error('Error testing connection to Jellyfin server:', e);
      return null;
    }
  }

  async getSessionInfo(): Promise<SessionInfoDto[]> {
    try {
      const session = await this.getSession();
      const sessionInfo = await session.getSessions();
      
      if (sessionInfo.status !== 200) {
        console.error('No session info returned from Jellyfin API.');
        return [];
      }

      return sessionInfo.data;
    } catch (e) {
      console.error('Error fetching session info:', e);
      throw e;
    }
  }

  async getSessions(): Promise<SessionInfoDto[]> {
    const sessions = await this.getSessionInfo();
    return sessions;
  }

  async getActiveSessions(): Promise<SessionInfoDto[]> {
    const sessions = await this.getSessions();
    return sessions.filter(session => session.IsActive);
  }

  async getMyActiveSessions(): Promise<SessionInfoDto[]> {
    const sessions = await this.getActiveSessions();
    const savedMe = await db.getMe();

    if (!savedMe) {
      throw new Error('You hasn\'t saved your user info yet.');
    }

    const myUserId = savedMe.UserId;
    const me = sessions.filter(session => session.UserId === myUserId);
    return me;
  }

  async getShowCoverArtUrl(itemId: string | null | undefined): Promise<string | null> {
    if (!itemId) return null;
    
    const serverCreds = await db.getServerInfo();
    const baseUrl = serverCreds?.PublicBaseUrl ?? serverCreds?.BaseUrl;

    // background-image: url("https://jellyfin.mdlab.my.id/Items/2bcea981a28d28e5831d0afe7f3b9ac8/Images/Primary?fillHeight=372&fillWidth=253&quality=96&tag=97279ba319e72ab1092bd74b756dbb97");
    const coverArtUrl = `${baseUrl}/Items/${itemId}/Images/Primary`;
    return coverArtUrl;
  }
}
