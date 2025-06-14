import { readDB, writeDB } from "../utils/functions/database.ts";
import { Habit } from '../utils/models/Habit.ts';
import { OFFSET_DAYS } from '../config.ts';

export const addHabit = async (name: string, freq: string) => {
  try {
    const db: Habit[] = await readDB();
    const habit = new Habit(name, freq);
    await writeDB([...db, habit]);
    return habit;
  } catch(e) {
    throw new Error(`Помилка при додаванні: ${e}`);
  }
}

export const updateHabit = async (id: string, name: string, freq: string) => {
  try {
    const db: Habit[] = await readDB();
    const index: number = db.findIndex((habit: Habit) => habit.id === id);
    const dateUpdated: Date = new Date();
    if (index === -1) return null;
    db[index] = { ...db[index], name, freq, dateUpdated };
    await writeDB(db);
    return db[index];
  } catch(e) {
    throw new Error(`Помилка при редагуванні: ${e}`);
  }
}

export const doneHabit = async (id: string) => {
  try {
    const db: Habit[] = await readDB();
    const index: number = db.findIndex((habit: Habit) => habit.id === id);
    const isDone: boolean = true;
    if (index === -1) return null;
    db[index] = { ...db[index], isDone };
    await writeDB(db);
    return db[index];
  } catch(e) {
    throw new Error(`Помилка при компліті: ${e}`);
  }
}

export const deleteHabit = async (id: string) => {
  try {
    const db: Habit[] = await readDB();
    const filteredHabits: Habit[] = db.filter((habit) => habit.id !== id);
    if (filteredHabits.length === db.length) return false;
    await writeDB(filteredHabits);
    return true;
  } catch(e) {
    throw new Error(`Помилка при видалені: ${e}`);
  }
}

export const listHabits = async () => {
  try {
    const db: Habit[] = await readDB();
    return db.map(({ id, name, freq, dateCreated, dateUpdated, isDone }) => ({ id, name, freq, dateCreated, dateUpdated, isDone }));
  } catch(e) {
    throw new Error(`Помилка при читанні: ${e}`);
  }
}

export const showStats = async () => {
  try {
    const db: Habit[] = await readDB();
    const today = new Date();
    today.setDate(today.getDate() + OFFSET_DAYS);

    const statsMap = new Map<string, { done: number; expected: number }>();

    db.forEach(habit => {
      const freq = habit.freq;
      const updated = new Date(habit.dateUpdated);
      const daysToCheck = freq === 'daily' ? 7 : freq === 'weekly' ? 28 : 30;

      const cutoff = new Date(today);
      cutoff.setDate(today.getDate() - daysToCheck);

      const done = (habit.isDone && updated >= cutoff && updated <= today) ? 1 : 0;

      const key = `${habit.name}__${habit.freq}`;
      const current = statsMap.get(key) || { done: 0, expected: 0 };

      statsMap.set(key, {
        done: current.done + done,
        expected: current.expected + 1
      });
    });

    const result: string[] = [];

    for (const [key, value] of statsMap.entries()) {
      const [name, freq] = key.split('__');
      const percent = Math.round((value.done / value.expected) * 100);
      result.push(`${name} (${freq}): ${percent}% (${value.done}/${value.expected})`);
    }

    return result;
  } catch (e) {
    throw new Error(`Помилка при виводі статистики: ${e}`);
  }
}
