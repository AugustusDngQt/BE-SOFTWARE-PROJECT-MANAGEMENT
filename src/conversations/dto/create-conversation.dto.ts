import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  participantIds: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId?: string;
}
