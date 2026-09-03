 
import { DatabaseService } from '../database/DatabaseService.js';
import { promptAccountToTrack } from './functions/PromptAccountToTrack';
import { updateProgress } from './functions/UpdateProgress';

const db = new DatabaseService();
export const TICKS_TO_MS = 10000;
export const TICKS_TO_S = 10_000_000;

const savedMe = await db.getMe();
if (!savedMe) {
    await promptAccountToTrack();
}

const settings = await db.getSettings();
const updateInterval = settings.updateInterval;

setInterval(() => {
    (async (): Promise<void> => {
        await updateProgress();
    })();
}, updateInterval);

await updateProgress();
