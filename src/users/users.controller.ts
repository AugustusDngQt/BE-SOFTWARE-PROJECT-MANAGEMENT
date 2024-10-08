import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { Public } from 'src/decorators/is-public.decorator';
import { Users } from '@prisma/postgres/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @User() userLogin?: IUserLogin,
  ): Promise<IUserResponse> {
    if (userLogin)
      return await this.usersService.create(createUserDto, userLogin);
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('authentications')
  async authentications(@User() user: IUserLogin): Promise<{ user: Users }> {
    return { user: await this.usersService.findOneById(user.id) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOneById(id);
    return await this.usersService.findOneByUniqueField(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
