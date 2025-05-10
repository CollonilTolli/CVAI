import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class VoiceController {
  @MessagePattern('add-voice')
  async processVoice(@Payload() file: Buffer): Promise<boolean> {
    try {
      // сюда логику обработки войса
      console.log('Received voice file, size:', file.length);
      return true;
    } catch (error) {
      console.error('Error processing voice file:', error);
      return false;
    }
  }
}
