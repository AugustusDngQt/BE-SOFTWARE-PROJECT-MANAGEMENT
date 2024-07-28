import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';
import { PrismaService } from 'src/prisma.service';
import { EUserStatus } from 'src/enum/user.enum';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { UserMessages } from 'src/constants/messages/user.message';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createUserDto: CreateUserDto,
    userLogin?: IUserLogin,
  ): Promise<IUserResponse> {
    if (
      (await this.findOneByUniqueField(createUserDto.email)) ||
      (await this.findOneByUniqueField(createUserDto.phoneNumber))
    )
      throw new BadRequestException({
        message: UserMessages.EMAIL_OR_PHONE_NUMBER_ALREADY_EXISTS,
      });
    const createdBy: IExecutor = userLogin
      ? {
          id: userLogin.id,
          email: userLogin.email,
          name: userLogin.name,
          role: '',
        }
      : null;
    const user: IUserResponse = await this.prismaService.users.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        address: createUserDto.address,
        phoneNumber: createUserDto.phoneNumber,
        password: await bcrypt.hash(createUserDto.password, 10),
        status: EUserStatus.UNVERIFIED,
        createdBy,
      },
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByUniqueField(value: string): Promise<IUserResponse> {
    return await this.prismaService.users.findFirst({
      where: {
        OR: [{ phoneNumber: value }, { email: value }],
      },
    });
  }

  async findOneById(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
