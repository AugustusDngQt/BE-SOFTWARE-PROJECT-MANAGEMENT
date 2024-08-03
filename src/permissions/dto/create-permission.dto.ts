import { IsString, IsEnum, IsOptional } from 'class-validator';
import {
  EPermissionModules,
  EPermissionMethods,
} from 'src/enum/permission.enum';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsEnum(EPermissionModules)
  module: string;

  @IsEnum(EPermissionMethods)
  method: string;

  @IsOptional()
  @IsString()
  description?: string;
}
