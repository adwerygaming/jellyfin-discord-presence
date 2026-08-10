import { Api } from "@jellyfin/sdk";
import { SessionApi, SessionInfoDto } from "@jellyfin/sdk/lib/generated-client/index.js";
import { getSessionApi } from "@jellyfin/sdk/lib/utils/api/index.js";
import { DatabaseService } from "../database/DatabaseService.js";
import { jellyfin } from "./Client.js";

const db = new DatabaseService();

interface TestConnectionResult {
  ServerId: string;
  RemoteEndPoint: string;
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
        RemoteEndPoint: session.RemoteEndPoint || 'Unknown'
      };
    } catch (e) {
      console.error('Error testing connection to Jellyfin server:', e);
      throw e;
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

  async getActiveSessions(): Promise<SessionInfoDto[]> {
    const sessions = await this.getSessionInfo();
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
}
