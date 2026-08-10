import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import tags from "./Tags.js";

// Schema for .env file,
// Make sure to sync this to .env file.
// Default value are: z.string()
const envSchema = z.object({
    DISCORD_CLIENT_ID: z.string(),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assuming you place the .env file in the root
config({ path: resolve(__dirname, "../../.env") });

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
    const errorTree = z.treeifyError(envParsed.error);
    const missingVars = Object.entries(errorTree.properties ?? {})
        .filter(([, node]) => (node.errors.length || 0) > 0)
        .map(([key]) => key);

    console.log(`[${tags.Error}] Missing environment variables:\n${missingVars.join("\n")}`);
    throw new Error(`Please check your .env file again and make sure all required variables are set.`);
}

console.log(`[${tags.System}] Environment Variable Check Success.`);

export const env = envParsed.data;
