import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logEvent(event: any) {
    console.log('📩 Kafka Event:', event);
  }
}
