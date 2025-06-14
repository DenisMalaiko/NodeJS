import { readDB, writeDB } from "../utils/functions/database.ts";
import { Habit } from '../utils/models/Habit.ts';

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
    const data: Habit[] = await readDB();
    return data.map(({ id, name, freq, dateCreated, dateUpdated, isDone }) => ({ id, name, freq, dateCreated, dateUpdated, isDone }));
  } catch(e) {
    throw new Error(`Помилка при читанні: ${e}`);
  }
}

export const showStats = async () => {
  console.log("SHOW STATS")
  try {

  } catch(e) {
    throw new Error(`Помилка при виводі статистики: ${e}`);
  }
}
