import { input } from '@inquirer/prompts';
import { DatabaseService } from '../database/DatabaseService.js';
import tags from '../utils/Tags.js';

const db = new DatabaseService();

const serverInfo = await db.getServerInfo();

if (!serverInfo) {
    console.log(`[${tags.System}] Welcome to Jellyfin Discord Presence! Let's set up your Jellyfin server connection.`);
    const baseUrl = await input({
        message: 'Enter your Jellyfin server base URL (e.g., http://localhost:8096):',
        validate: (value) => {
            if (!value) {
                return 'Base URL cannot be empty.';
            }

            try {
                new URL(value);
                return true;
            } catch {
                return 'Please enter a valid URL.';
            }
        },
        default: 'http://localhost:8096',
    });

    console.log(`[${tags.Info}] You can get your Jellyfin Server API key from ${baseUrl}/web/#/dashboard/keys`);
    const apiKey = await input({
        message: 'Enter your Jellyfin Server API key:',
        validate: (value) => {
            if (!value) {
                return 'API key cannot be empty.';
            }
            return true;
        },
    });

    try {

        

        await db.updateServerInfo({ BaseUrl: baseUrl, ApiKey: apiKey, Name: 'Jellyfin Server' });
        console.log(`[${tags.System}] Jellyfin server connection saved successfully!`);
    } catch (e) {
        console.error(`[${tags.Error}] Failed to save Jellyfin server connection.`, e);
    }
}
