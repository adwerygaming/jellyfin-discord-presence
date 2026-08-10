import { SessionInfoDto } from '@jellyfin/sdk/lib/generated-client/index.js';
import { db } from './Client';

export interface ServerInfo {
    BaseUrl: string;
    ApiKey: string;
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
}
