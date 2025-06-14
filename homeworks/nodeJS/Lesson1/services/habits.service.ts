import * as repo from "../models/habits.model.ts";

export const addHabit = async (name: string, freq: string) => await repo.addHabit(name, freq);
export const updateHabit = async (id: string, name: string, freq: string) => await repo.updateHabit(id, name, freq);
export const doneHabit = async (id: string) => await repo.doneHabit(id);
export const deleteHabit = async (id: string) => await repo.deleteHabit(id);
export const listHabits = async () => await repo.listHabits();
export const showStats = async () => await repo.showStats();