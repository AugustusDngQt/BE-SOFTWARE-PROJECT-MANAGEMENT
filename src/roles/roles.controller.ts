import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from 'src/decorators/user.decorator';
import { type Roles } from '@prisma/client';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @User() user: IUserLogin,
  ): Promise<Roles> {
    return this.rolesService.create(createRoleDto, user);
  }

  @Patch()
  async update(
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUserLogin,
  ): Promise<Roles> {
    return await this.rolesService.update(updateRoleDto, user);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string, @User() user: IUserLogin) {
    return await this.rolesService.restore(id, user);
  }

  @Get('find-one-by-id/:id')
  async findById(@Param('id') id: string): Promise<Roles> {
    return await this.rolesService.findById(id);
  }

  @Get()
  async findMany(): Promise<Roles[]> {
    return await this.rolesService.find();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUserLogin) {
    return await this.rolesService.remove(id, user);
  }
}
