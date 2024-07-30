import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ESprintStatus } from 'src/enum/sprint.enum';

export class UpdateSprintDto {
  @IsUUID('4')
  id: string;

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
  @IsString()
  assigneeId?: string;

  @IsOptional()
  @IsEnum(ESprintStatus)
  status?: string;
}
