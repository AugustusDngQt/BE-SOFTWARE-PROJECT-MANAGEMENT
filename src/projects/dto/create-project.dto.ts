import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EProjectCategory } from 'src/enum/project.enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
  @IsString()
  @IsEnum(EProjectCategory)
  category: string;
  @IsArray()
  @IsUUID('4', { each: true })
  memberIds: string[];
}
