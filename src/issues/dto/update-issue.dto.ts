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
  @IsUUID('4')
  reporterId?: string;

  @IsOptional()
  @IsUUID('4')
  assigneeId?: string;

  @IsOptional()
  @IsUUID('4')
  parentId?: string;

  @IsOptional()
  @IsNumber()
  printPosition: number;

  @IsOptional()
  @IsNumber()
  boardPosition: number;

  @IsOptional()
  @IsString()
  sprintColors: string;

  @IsOptional()
  @IsUUID('4')
  sprintId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  isDeleted?: boolean;
}
