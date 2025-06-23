import { generateId } from '../functions/utils.ts';

export class Habit {
  id: string;
  name: string;
  freq: string;
  isDone: boolean;
  dateCreated: Date;
  dateUpdated: Date;

  constructor(name: string, freq: string) {
    this.id = generateId();
    this.name = name;
    this.freq = freq;
    this.isDone = false;
    this.dateCreated = new Date();
    this.dateUpdated = new Date();
  }
}