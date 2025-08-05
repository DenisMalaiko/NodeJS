import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('signup')
  async signUp(@Body() body: any) {
    await this.notificationService.sendUserSignedUpEvent(body);
    return { message: 'User signed up. Event sent to kafka' };
  }
}
