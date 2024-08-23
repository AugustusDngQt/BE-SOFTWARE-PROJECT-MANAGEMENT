import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
// import { type Permissions } from '@prisma/postgres/client';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { PERMISSION_MESSAGES } from 'src/constants/messages/permission.message';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { FindPermissionsByMethodModuleDto } from './dto/find-by-method-&-module.dto';

@Injectable()
export class PermissionsService {
  constructor(private PostgresPrismaService: PostgresPrismaService) {}

  // async create(
  //   createPermissionDto: CreatePermissionDto,
  //   userLogin: IUserLogin,
  // ): Promise<Permissions> {
  //   const createdBy: IExecutor = {
  //     id: userLogin.id,
  //     name: userLogin.name,
  //     email: userLogin.email,
  //   };
  //   return await this.PostgresPrismaService.permissions.create({
  //     data: {
  //       ...createPermissionDto,
  //       createdBy,
  //     },
  //   });
  // }

  // async update(
  //   updatePermissionDto: UpdatePermissionDto,
  //   userLogin: IUserLogin,
  // ): Promise<Permissions> {
  //   const { id, ...payload } = updatePermissionDto;
  //   const existingPermission = await this.findById(id);
  //   if (!existingPermission) {
  //     throw new BadRequestException(PERMISSION_MESSAGES.PERMISSION_NOT_FOUND);
  //   }

  //   const updatedBy: IExecutor = {
  //     id: userLogin.id,
  //     name: userLogin.name,
  //     email: userLogin.email,
  //   };

  //   return await this.PostgresPrismaService.permissions.update({
  //     where: { id },
  //     data: { ...payload, updatedBy },
  //   });
  // }

  // async restore(id: string, userLogin: IUserLogin): Promise<Permissions> {
  //   const permission = await this.PostgresPrismaService.permissions.findUnique({
  //     where: { id, isDeleted: true },
  //   });
  //   if (!permission) {
  //     throw new NotFoundException(
  //       PERMISSION_MESSAGES.PERMISSION_NOT_FOUND_OR_RESTORED,
  //     );
  //   }
  //   const updatedBy: IExecutor = {
  //     id: userLogin.id,
  //     name: userLogin.name,
  //     email: userLogin.email,
  //   };
  //   return await this.PostgresPrismaService.permissions.update({
  //     where: { id },
  //     data: {
  //       isDeleted: false,
  //       deletedAt: null,
  //       deletedBy: null,
  //       updatedBy,
  //     },
  //   });
  // }

  // async findById(id: string): Promise<Permissions> {
  //   const permission = await this.PostgresPrismaService.permissions.findUnique({
  //     where: { id, isDeleted: false },
  //   });
  //   return permission;
  // }

  // async find(query: FindPermissionsByMethodModuleDto): Promise<Permissions[]> {
  //   const { module, method } = query;
  //   return await this.PostgresPrismaService.permissions.findMany({
  //     where: {
  //       isDeleted: false,
  //       module: module ? module : undefined,
  //       method: method ? method : undefined,
  //     },
  //   });
  // }

  // async remove(id: string, userLogin: IUserLogin): Promise<Permissions> {
  //   const permission = await this.findById(id);
  //   if (!permission) {
  //     throw new NotFoundException(PERMISSION_MESSAGES.PERMISSION_NOT_FOUND);
  //   }
  //   const deletedBy: IExecutor = {
  //     id: userLogin.id,
  //     name: userLogin.name,
  //     email: userLogin.email,
  //   };
  //   return await this.PostgresPrismaService.permissions.update({
  //     where: { id, isDeleted: false },
  //     data: { isDeleted: true, deletedAt: new Date(), deletedBy },
  //   });
  // }
}
