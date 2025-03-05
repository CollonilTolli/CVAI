import { Controller } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller()
export class VoiceProcessorController {
  constructor() {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'voice-processor',
        brokers: ['localhost:9092'],
      },
      consumer: { groupId: 'voice-consumer' },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('add-voice');
    await this.client.connect();
  }
}
