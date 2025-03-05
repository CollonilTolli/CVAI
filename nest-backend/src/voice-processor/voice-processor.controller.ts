import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { lastValueFrom } from 'rxjs';

@Controller()
export class VoiceProcessorController {
  constructor() {}

  @Post('upload-voice')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVoice(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    try {
      const result = await lastValueFrom(
        this.client.send('add-voice', file.buffer),
      );
      return result;
    } catch (error) {
      console.error('Error sending voice file:', error);
      return false;
    }
  }

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
