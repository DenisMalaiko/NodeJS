import { parseArgs } from './utils/functions/parseCommands.ts';
import { HabitsController } from './controllers/habits.controller.ts';

async function init() {
  const args = parseArgs(process.argv);
  const habitsController = new HabitsController();

  switch (args.command) {
    case 'add':
      const newHabit = await habitsController.add(args.name, args.freq);
      console.log("ADD HABIT ", newHabit);
      break;
    case 'update':
      const updatedHabit = await habitsController.update(args.id, args.name, args.freq);
      console.log("UPDATE HABIT ", updatedHabit);
      break;
    case 'done':
      const completedHabit = await habitsController.done(args.id)
      console.log("DONE HABIT ", completedHabit);
      break;
    case 'delete':
      const deletedHabit = await habitsController.delete(args.id);
      console.log("DELETE HABIT ", deletedHabit);
      break;
    case 'list':
      const list = await habitsController.list();
      console.log("LIST HABITS");
      console.table(list);
      break;
    case 'stats':
      const stats = await habitsController.showStats();
      console.log("STATS ", stats);
      break;
    default:
      console.log('Невідома команда.');
  }
}


await init();