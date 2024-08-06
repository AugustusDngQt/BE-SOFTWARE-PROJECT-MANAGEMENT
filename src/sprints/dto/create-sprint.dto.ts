import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSprintDto {
  @IsUUID('4')
  projectId: string;
}
