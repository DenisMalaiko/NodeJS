import { parseArgs } from './utils/parseCommands.ts';
const args = parseArgs(process.argv);

switch (args.command) {
  case 'add':
    console.log("ADD")
    //addHabit(args.name, args.freq);
    break;
  case 'list':
    console.log("LIST")
    //listHabits();
    break;
  case 'done':
    console.log("DONE")
    //markDone(args.id);
    break;
  case 'stats':
    console.log("STATS")
    //showStats();
    break;
  case 'delete':
    console.log("DELETE")
    //deleteHabit(args.id);
    break;
  case 'update':
    console.log("UPDATE")
    //updateHabit(args.id, args.name, args.freq);
    break;
  default:
    console.log('Невідома команда.');
}
