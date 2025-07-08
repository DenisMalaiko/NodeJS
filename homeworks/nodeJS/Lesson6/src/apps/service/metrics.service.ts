import { Injectable } from '../../core/decorators/injectable';

@Injectable()
export class MetricsService {
  #counters = new Map<string, number>();

  store(methodName: string) {
    const prev = this.#counters.get(methodName) || 0;
    this.#counters.set(methodName, prev + 1);
    console.log("[ INJECT SERVICE ]")
    console.table(Object.fromEntries(this.#counters));
  }
}