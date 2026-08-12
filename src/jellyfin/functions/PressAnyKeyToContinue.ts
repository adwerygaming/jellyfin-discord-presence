import { input } from "@inquirer/prompts";

export async function pressAnyKeyToContinue(): Promise<void> {
    await input({
        message: 'Press any key to continue...',
    });
}
