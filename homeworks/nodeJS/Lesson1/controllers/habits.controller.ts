import * as service from "../services/habits.service.ts";

export class HabitsController {
  constructor() {}

  async add(name: string, freq: string) {
     return await service.addHabit(name, freq)
  }

  async update(id: string, name: string, freq: string) {
    return await service.updateHabit(id, name, freq);
  }

  async done(id: string) {
    return await service.doneHabit(id);
  }

  async delete(id: string) {
    return await service.deleteHabit(id);
  }

  async list() {
    return await service.listHabits();
  }

  async showStats() {
    return await service.showStats();
  }
}