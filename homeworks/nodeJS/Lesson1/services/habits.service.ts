import * as repo from "../models/habits.model.ts";
import {Habit} from "../utils/entity/Habit.ts";

export const addHabit = async (name: string, freq: string) => await repo.addHabit(name, freq);
export const updateHabit = async (id: string, name: string, freq: string) => await repo.updateHabit(id, name, freq);
export const doneHabit = async (id: string) => await repo.doneHabit(id);
export const deleteHabit = async (id: string) => await repo.deleteHabit(id);
export const listHabits = async () => await repo.listHabits();
export const showStats = async () => {
  const data: Habit[] = await repo.showStats();

  const statsMap = new Map<string, { done: number; expected: number }>();

  data.forEach(habit => {
    const done = (habit.isDone) ? 1 : 0;
    const key = `${habit.name}__${habit.freq}`;
    const current = statsMap.get(key) || { done: 0, expected: 0 };

    statsMap.set(key, {
      done: current.done + done,
      expected: current.expected + 1
    });
  })

  const result: string[] = [];

  for (const [key, value] of statsMap.entries()) {
    const [name, freq] = key.split('__');
    const percent = Math.round((value.done / value.expected) * 100);
    result.push(`${name} (${freq}): ${percent}% (${value.done}/${value.expected})`);
  }

  return result;
}