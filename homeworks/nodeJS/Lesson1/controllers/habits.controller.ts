import * as service from "../services/habits.service.ts";

export class HabitsController {
  constructor() {}

  async add(name: string, freq: string) {
    if (!name || !freq) {
      console.error('Use: npm run habit -- add --name "<текст звички>" --freq <daily|weekly|monthly>');
      return;
    }
    return await service.addHabit(name, freq)
  }

  async update(id: string, name: string, freq: string) {
    if (!id || !name || !freq) {
      console.error('Use: npm run habit -- update --id <ідентифікатор> --name "<текст звички>" --freq <daily|weekly|monthly>');
      return;
    }
    return await service.updateHabit(id, name, freq);
  }

  async done(id: string) {
    if (!id) {
      console.error('Use: npm run habit -- done --id <ідентифікатор>');
      return;
    }
    return await service.doneHabit(id);
  }

  async delete(id: string) {
    if (!id) {
      console.error('Use: npm run habit -- delete --id <ідентифікатор>');
      return;
    }
    return await service.deleteHabit(id);
  }

  async list() {
    return await service.listHabits();
  }

  async showStats() {
    return await service.showStats();
  }
}