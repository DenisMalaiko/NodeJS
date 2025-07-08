import { Injectable } from './decorators/injectable';

@Injectable()
export class Logger {
  log(message: string) {
    console.log('[Logger]', message);
  }
}