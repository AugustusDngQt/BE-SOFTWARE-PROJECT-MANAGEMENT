import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { type Roles } from '@prisma/client';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { ROLE_MESSAGES } from 'src/constants/messages/role.message';

@Injectable()
export class RolesService {
  constructor(private PostgresPrismaService: PostgresPrismaService) {}

  async create(
    createRoleDto: CreateRoleDto,
    userLogin: IUserLogin,
  ): Promise<Roles> {
    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    return await this.PostgresPrismaService.roles.create({
      data: {
        ...createRoleDto,
        createdBy,
      },
    });
  }

  async update(
    updateRoleDto: UpdateRoleDto,
    userLogin: IUserLogin,
  ): Promise<Roles> {
    const { id, ...payload } = updateRoleDto;
    const existingRole = await this.findById(id);
    if (!existingRole) {
      throw new BadRequestException(ROLE_MESSAGES.ROLE_NOT_FOUND);
    }

    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    return await this.PostgresPrismaService.roles.update({
      where: { id },
      data: { ...payload, updatedBy },
    });
  }

  async restore(id: string, userLogin: IUserLogin): Promise<Roles> {
    const role = await this.PostgresPrismaService.roles.findUnique({
      where: { id, isDeleted: true },
    });
    if (!role) {
      throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND_OR_RESTORED);
    }
    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    return await this.PostgresPrismaService.roles.update({
      where: { id },
      data: {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
        updatedBy,
      },
    });
  }

  async findById(id: string): Promise<Roles> {
    const role = await this.PostgresPrismaService.roles.findUnique({
      where: { id, isDeleted: false },
    });
    return role;
  }

  async find(): Promise<Roles[]> {
    return await this.PostgresPrismaService.roles.findMany({
      where: { isDeleted: false },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<Roles> {
    const role = await this.findById(id);
    if (!role) {
      throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);
    }
    const deletedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    return await this.PostgresPrismaService.roles.update({
      where: { id, isDeleted: false },
      data: { isDeleted: true, deletedAt: new Date(), deletedBy },
    });
  }
}
