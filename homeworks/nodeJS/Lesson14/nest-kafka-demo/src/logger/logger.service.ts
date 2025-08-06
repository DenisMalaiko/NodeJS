import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logEvent({ event, data }) {
    console.log('📩 Kafka Event: ', event);
    console.log('📩 Kafka Data: ', data);
  }
}
