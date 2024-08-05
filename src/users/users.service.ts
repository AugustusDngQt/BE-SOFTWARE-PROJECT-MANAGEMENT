import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';
import { EUserStatus } from 'src/enum/user.enum';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { UserMessages } from 'src/constants/messages/user.message';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly PostgresPrismaService: PostgresPrismaService) {}
  async create(
    createUserDto: CreateUserDto,
    userLogin?: IUserLogin,
  ): Promise<Users> {
    if (await this.findOneByUniqueField(createUserDto.email))
      throw new BadRequestException({
        message: UserMessages.EMAIL_OR_ALREADY_EXISTS,
      });
    const user: Users = await this.PostgresPrismaService.users.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByUniqueField(value: string): Promise<IUserResponse> {
    return await this.PostgresPrismaService.users.findFirst({
      where: {
        OR: [{ email: value }],
      },
    });
  }

  async findOneById(id: string): Promise<IUserResponse> {
    const user: IUserResponse =
      await this.PostgresPrismaService.users.findUnique({
        where: { id },
      });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
