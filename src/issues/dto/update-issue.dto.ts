// dto/update-issue.dto.ts
import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsNumber,
  Validate,
  ValidateIf,
  IsNotIn,
  IsObject,
} from 'class-validator';
import { EIssueType, EIssueStatus, EIssuePriority } from 'src/enum/issue.enum';

export class UpdateIssueDto {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(EIssueType)
  @IsNotIn([EIssueType.SUBTASK], { message: 'Type cannot be Sub-task' })
  type?: string;

  @IsOptional()
  @IsEnum(EIssueStatus)
  status?: string;

  @IsOptional()
  @IsEnum(EIssuePriority)
  priority?: string;

  @IsOptional()
  @IsUUID('4')
  reporterId?: string;

  @IsOptional()
  @IsUUID('4')
  assigneeId?: string;

  @IsOptional()
  @IsUUID('4')
  sprintId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
