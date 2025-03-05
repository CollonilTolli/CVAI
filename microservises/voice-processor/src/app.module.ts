import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';

@Module({
  imports: [],
  controllers: [VoiceController],
})
export class AppModule {}
