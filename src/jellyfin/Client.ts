import { Jellyfin } from '@jellyfin/sdk/lib/jellyfin.js';
import { getSessionApi } from '@jellyfin/sdk/lib/utils/api/session-api.js';

const jellyfin = new Jellyfin({
  clientInfo: { name: 'MyApp', version: '1.0.0' },
  deviceInfo: { name: 'MyDevice', id: 'unique-device-id' }
});

const api = jellyfin.createApi('https://your-jellyfin-server.com', 'your-api-key');
const session = getSessionApi(api);

class JellyfinService {
  private jellyfin: Jellyfin;
  private baseUrl: string;
  private apiKey: string;

  constructor(
    jellyfin: Jellyfin,
    baseUrl: string,
    apiKey: string
  ) {
    this.jellyfin = jellyfin;
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getSessionInfo(): Promise<> {
    try {
      const sessionInfo = await session.getSession();
      return sessionInfo;
    } catch (error) {
      console.error('Error fetching session info:', error);
      throw error;
    }
  }
}
