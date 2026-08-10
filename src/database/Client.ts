import fs from "node:fs";
import path from "path";
import { QuickDB } from "quick.db";
import { fileURLToPath } from "url";
import tags from "../utils/Tags.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, "..", "..");
console.log(`[${tags.Debug}] Root directory: ${rootDir}`);

const dbDir = path.join(rootDir, "db");
console.log(`[${tags.Debug}] Database directory: ${dbDir}`);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbFilePath = path.join(dbDir, "database.sqlite");
if (!fs.existsSync(dbFilePath)) {
    console.log(`[${tags.Debug}] Database inited at ${dbDir}`);
}

export const db = new QuickDB({ filePath: dbFilePath });
