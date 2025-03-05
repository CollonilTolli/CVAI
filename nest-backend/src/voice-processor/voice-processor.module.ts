import { Module } from '@nestjs/common';
import { VoiceProcessorController } from './voice-processor.controller';

@Module({
  controllers: [VoiceProcessorController],
})
export class VoiceProcessorModule {}
