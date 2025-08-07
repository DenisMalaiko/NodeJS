import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import * as process from "node:process";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification-client',
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'notification-group',
          },
        },
      },
    ]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
