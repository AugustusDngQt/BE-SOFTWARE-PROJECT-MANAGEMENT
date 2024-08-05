import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID('4')
  issueId: string;
  @IsString()
  content: string;
}
