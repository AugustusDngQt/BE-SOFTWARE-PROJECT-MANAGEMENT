// dto/create-issue.dto.ts
import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsNumber,
  ValidateIf,
  IsDateString,
} from 'class-validator';
import { EIssueType, EIssueStatus, EIssuePriority } from 'src/enum/issue.enum';

export class CreateIssueDto {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsEnum(EIssueType)
  type: string;

  @IsEnum(EIssueStatus)
  status: string;

  @IsEnum(EIssuePriority)
  priority: string;

  @ValidateIf((o) => o.type === EIssueType.SUBTASK)
  @IsString()
  issueParrentId?: string;

  @ValidateIf((o) => o.projectId === undefined)
  @IsUUID('4')
  sprintId?: string;

  @ValidateIf((o) => o.sprintId === undefined)
  @IsUUID('4')
  projectId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsDateString()
  endDate: string;
}
