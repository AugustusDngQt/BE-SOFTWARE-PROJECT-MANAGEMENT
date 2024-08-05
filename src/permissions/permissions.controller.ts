import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User } from 'src/decorators/user.decorator';
// import { type Permissions } from '@prisma/client';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { FindPermissionsByMethodModuleDto } from './dto/find-by-method-&-module.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @Post()
  // async create(
  //   @Body() createPermissionDto: CreatePermissionDto,
  //   @User() user: IUserLogin,
  // ): Promise<Permissions> {
  //   return this.permissionsService.create(createPermissionDto, user);
  // }

  // @Patch()
  // async update(
  //   @Body() updatePermissionDto: UpdatePermissionDto,
  //   @User() user: IUserLogin,
  // ): Promise<Permissions> {
  //   return await this.permissionsService.update(updatePermissionDto, user);
  // }

  // @Post('restore/:id')
  // async restore(@Param('id') id: string, @User() user: IUserLogin) {
  //   return await this.permissionsService.restore(id, user);
  // }

  // @Get('find-one-by-id/:id')
  // async findById(@Param('id') id: string): Promise<Permissions> {
  //   return await this.permissionsService.findById(id);
  // }

  // @Get()
  // async findMany(
  //   @Query() query: FindPermissionsByMethodModuleDto,
  // ): Promise<Permissions[]> {
  //   return await this.permissionsService.find(query);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string, @User() user: IUserLogin) {
  //   return await this.permissionsService.remove(id, user);
  // }
}
