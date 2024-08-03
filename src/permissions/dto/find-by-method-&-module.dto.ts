import { IsString, IsEnum, IsOptional } from 'class-validator';
import {
  EPermissionMethods,
  EPermissionModules,
} from 'src/enum/permission.enum';

export class FindPermissionsByMethodModuleDto {
  @IsOptional()
  @IsEnum(EPermissionModules)
  module?: string;

  @IsOptional()
  @IsEnum(EPermissionMethods)
  method?: string;
}
