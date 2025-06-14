import {readFile, writeFile} from "node:fs/promises";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import {Habit} from "../models/Habit.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB = join(__dirname, '../..', 'database.json');

export const readDB = async () => JSON.parse(await readFile(DB, 'utf8'));

export const writeDB = async (data: Habit[]) => writeFile(DB, JSON.stringify(data, null, 2));
