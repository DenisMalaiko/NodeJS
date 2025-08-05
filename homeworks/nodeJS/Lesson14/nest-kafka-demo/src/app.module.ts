import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [NotificationModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
