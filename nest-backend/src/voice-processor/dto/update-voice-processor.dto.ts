import { PartialType } from '@nestjs/mapped-types';
import { CreateVoiceProcessorDto } from './create-voice-processor.dto';

export class UpdateVoiceProcessorDto extends PartialType(CreateVoiceProcessorDto) {
  id: number;
}
