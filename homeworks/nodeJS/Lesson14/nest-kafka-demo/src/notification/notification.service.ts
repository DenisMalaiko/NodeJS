import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    console.log('Kafka client connected!');
    await this.kafkaClient.connect();
  }

  async sendUserSignedUpEvent(body: any) {
    this.kafkaClient.emit('events.notifications', {
      event: 'UserSignedUp',
      data: body,
    });
  }
}