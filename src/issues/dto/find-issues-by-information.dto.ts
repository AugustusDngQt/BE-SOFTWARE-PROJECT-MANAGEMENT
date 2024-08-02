// dto/update-issue.dto.ts
import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { EIssueType, EIssueStatus, EIssuePriority } from 'src/enum/issue.enum';

export class FindIssuesByInformationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(EIssueType)
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
  @IsUUID('4')
  projectId?: string;
}
