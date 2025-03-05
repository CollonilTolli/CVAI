import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoiceProcessorModule } from './voice-processor/voice-processor.module';

@Module({
  imports: [VoiceProcessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
