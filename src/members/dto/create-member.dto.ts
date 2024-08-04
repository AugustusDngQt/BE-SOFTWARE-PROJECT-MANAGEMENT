import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsUUID('4')
  userId: string;
  @IsUUID('4')
  projectId: string;
  @IsUUID('4')
  roleId: string;
}
