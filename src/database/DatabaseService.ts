import { SessionInfoDto } from '@jellyfin/sdk/lib/generated-client/index.js';
import { db } from './Client';

export interface ServerInfo {
    BaseUrl: string;
    PublicBaseUrl: string | null;
    ApiKey: string;
}

export interface Settings {
    /** The interval in milliseconds */
    updateInterval: number;
}

export class DatabaseService {
    async getMe(): Promise<SessionInfoDto | null> {
        const me: SessionInfoDto | null = await db.get('me');
        return me;
    }

    async updateMe(data: SessionInfoDto): Promise<true> {
        await db.set('me', data);
        return true;
    }

    async getServerInfo(): Promise<ServerInfo | null> {
        return await db.get('serverInfo');
    }

    async updateServerInfo(data: ServerInfo): Promise<ServerInfo> {
        await db.set('serverInfo', data);
        return data;
    }

    async getSettings(): Promise<Settings> {
        const settings = await db.get('settings');
        if (!settings) {
            const defaultSettings: Settings = {
                updateInterval: 15000, 
            };

            await db.set('settings', defaultSettings);
            return defaultSettings;
        }
        return settings;
    }

    async setUpdateInterval(interval: number): Promise<void> {
        await db.set('settings.updateInterval', interval);
    }
}
