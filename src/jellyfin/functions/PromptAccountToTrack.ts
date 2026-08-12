/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { confirm, select } from "@inquirer/prompts";
import { DatabaseService } from "../../database/DatabaseService";
import { ServerCredsNotFoundError } from "../../utils/Errors";
import tags from "../../utils/Tags";
import { jellyfin } from "../ClientWrapper";
import { pressAnyKeyToContinue } from "./PressAnyKeyToContinue";
import { promptServerSetup } from "./PromptServerSetup";

const db = new DatabaseService();

export async function promptAccountToTrack(): Promise<void> {
    while (true) {
        try {
            const sessions = await jellyfin.getSessions();
            console.clear();

            if (sessions.length === 0) {
                console.log(`[${tags.Jellyfin}] No active sessions found. Please open Jellyfin on one of your devices and try again.`);
                await pressAnyKeyToContinue();
                continue;
            }

            console.log(`[${tags.Jellyfin}] Please select a user to track from the following active sessions:`);

            const tempSessionMap = new Map<string, string>();

            for (const session of sessions) {
                if (!session.UserId || !session.UserName) {
                    console.error(`[${tags.Error}] Session missing UserId or UserName. Skipping this session.`);
                    continue;
                }

                if (!tempSessionMap.has(session.UserId)) {
                    tempSessionMap.set(session.UserId, session.UserName);
                }
            }

            const users = Array.from(tempSessionMap.entries()).map(([userId, userName]) => {
                return {
                    name: `${userName} (${userId})`,
                    value: userId
                };
            });

            const answer = await select({
                message: 'Select a user to track:',
                choices: users,
            });

            const selectedSession = sessions.find(session => session.UserId === answer);
            if (!selectedSession) {
                console.error(`[${tags.Error}] Selected session not found. Please try again.`);
                await pressAnyKeyToContinue();
                continue;
            }

            const confirmation = await confirm({
                message: `Are you sure you want to track ${selectedSession.UserName}?`,
                default: true,
            });

            if (!confirmation) {
                console.log(`[${tags.Jellyfin}] Ok, let's try again.`);
                await pressAnyKeyToContinue();
                continue;
            }

            try {
                await db.updateMe(selectedSession);
                console.log(`[${tags.Jellyfin}] Successfully saved ${selectedSession.UserName} as the user to track.`);
                await pressAnyKeyToContinue();
                break;
            } catch (e) {
                console.error(`[${tags.Error}] Failed to save selected user.`, e);
                await pressAnyKeyToContinue();
                continue;
            }
        } catch (e) {
            if (e instanceof ServerCredsNotFoundError) {
                await promptServerSetup();
            } else {
                console.error(`[${tags.Error}] An error occurred while prompting for account to track:`, e);
                await pressAnyKeyToContinue();
                continue;
            }
        }
    }
}
