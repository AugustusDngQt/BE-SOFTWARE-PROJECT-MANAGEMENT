import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ESprintStatus } from 'src/enum/sprint.enum';

export class FindSprintByProjectIdStatusDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  @IsEnum(ESprintStatus)
  status?: string;
}
