import { readFileSync } from 'fs';

function loadEnv() {
  try {
    const content = readFileSync('.env', 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const [key, ...rest] = trimmed.split('=');
      const value = rest.join('=').trim().replace(/^"|"$/g, '');

      if (key && value) {
        process.env[key.trim()] = value;
      }
    }
  } catch (e) {
    console.warn('⚠️ .env файл не знайдено або нечитабельний');
  }
}

// Викликаємо при імпорті
loadEnv();

// Твоя змінна з типобезпекою
export const OFFSET_DAYS = parseInt(process.env.OFFSET_DAYS || '0');
export const PAST_DAYS = parseInt(process.env.PAST_DAYS || '0');