import { SessionInfoDto } from '@jellyfin/sdk/lib/generated-client/index.js';
import { db } from './Client';

interface ServerInfo {
    BaseUrl: string;
    ApiKey: string;
    Name: string;
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

    async updateServerInfo(data: ServerInfo): Promise<true> {
        await db.set('serverInfo', data);
        return true;
    }
}
