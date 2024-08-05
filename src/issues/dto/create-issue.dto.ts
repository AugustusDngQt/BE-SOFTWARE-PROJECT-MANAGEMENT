import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  ValidateIf,
  IsDateString,
} from 'class-validator';
import { EIssueType, EIssuePriority } from 'src/enum/issue.enum';

export class CreateIssueDto {
  @IsString()
  name: string;

  @IsEnum(EIssueType)
  type: string;

  @IsOptional()
  @IsUUID('4')
  parentId: string;

  @IsOptional()
  @IsUUID('4')
  sprintId?: string;

  @IsOptional()
  @IsString()
  reporterId?: string;
}
