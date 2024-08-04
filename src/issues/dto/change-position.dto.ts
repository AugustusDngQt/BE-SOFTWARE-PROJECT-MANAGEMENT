import { IsOptional, IsObject, ValidateIf } from 'class-validator';

export class ChangePositionIssueDto {
  @ValidateIf((o) => o.boardPosition === undefined)
  @IsObject()
  sprintPosition?: { issueId1: string; issueId2: string };

  @ValidateIf((o) => o.sprintPosition === undefined)
  @IsObject()
  boardPosition?: { issueId1: string; issueId2: string };
}
