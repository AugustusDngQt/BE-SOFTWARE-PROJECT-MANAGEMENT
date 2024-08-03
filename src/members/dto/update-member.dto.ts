import { IsEnum, IsString, IsUUID } from 'class-validator';
import { EMemberStatus } from 'src/enum/member.enum';

export class UpdateMemberDto {
  @IsString()
  @IsUUID('4')
  id: string;

  @IsString()
  @IsEnum(EMemberStatus)
  status: string;
}
