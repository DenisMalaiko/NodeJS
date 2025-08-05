import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @MessagePattern('events.notifications')
  async handleUserSignedUp(@Payload() message: any) {
    const event = JSON.parse(message.value.toString());
    this.loggerService.logEvent(event);
  }
}
