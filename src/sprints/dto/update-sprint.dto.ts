import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ESprintDuration, ESprintStatus } from 'src/enum/sprint.enum';

export class UpdateSprintDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(ESprintStatus)
  status?: string;

  @IsOptional()
  @IsEnum(ESprintDuration)
  duration?: string;
}
