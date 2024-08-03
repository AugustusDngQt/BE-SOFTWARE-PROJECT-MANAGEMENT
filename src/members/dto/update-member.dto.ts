import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { EMemberStatus } from 'src/enum/member.enum';

export class UpdateMemberDto {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsEnum(EMemberStatus)
  status: string;
}
