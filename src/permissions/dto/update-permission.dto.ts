import { IsString, IsEnum, IsOptional } from 'class-validator';
import {
  EPermissionModules,
  EPermissionMethods,
} from 'src/enum/permission.enum';

export class UpdatePermissionDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsEnum(EPermissionModules)
  module?: EPermissionModules;

  @IsOptional()
  @IsEnum(EPermissionMethods)
  method?: EPermissionMethods;

  @IsOptional()
  @IsString()
  description?: string;
}
