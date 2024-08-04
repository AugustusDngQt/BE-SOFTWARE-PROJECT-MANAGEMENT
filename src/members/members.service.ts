import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IMemberResponse } from 'src/interfaces/member/member.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { MEMBER_MESSAGES } from 'src/constants/messages/member.message';
import { type Members } from '@prisma/client';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Injectable()
export class MembersService {
  constructor(private PostgresPrismaService: PostgresPrismaService) {}
  async create(
    createMemberDto: CreateMemberDto,
    userLogin: IUserLogin,
  ): Promise<IMemberResponse> {
    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    const createdMember = await this.PostgresPrismaService.members.create({
      data: {
        User: { connect: { id: createMemberDto.userId } },
        Project: { connect: { id: createMemberDto.projectId } },
        Role: { connect: { id: createMemberDto.roleId } },
        createdBy,
      },
      include: { User: true, Project: true },
    });

    const member: IMemberResponse = {
      id: createdMember.id,
      userName: createdMember.User.name,
    };
    return member;
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  async findOneById(id: string): Promise<IMemberResponse> {
    const member = await this.PostgresPrismaService.members.findUnique({
      where: { id, isDeleted: false },
      include: { User: true },
    });
    return { id: member.id, userName: member.User.name };
  }

  async findAllByProjectId(projectId: string): Promise<IMemberResponse[]> {
    const foundMembers = await this.PostgresPrismaService.members.findMany({
      where: { projectId, isDeleted: false },
      include: { User: true },
    });

    const members: IMemberResponse[] = foundMembers.map((member) => {
      return {
        id: member.id,
        userName: member.User.name,
      };
    });
    return members;
  }

  async update(
    updateMemberDto: UpdateMemberDto,
    userLogin: IUserLogin,
  ): Promise<Members> {
    const { id, status } = updateMemberDto;

    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    if (!(await this.findOneById(id)))
      throw new BadRequestException(
        MEMBER_MESSAGES.MEMBER_NOT_FOUND_OR_DELETED,
      );
    return await this.PostgresPrismaService.members.update({
      where: { id, isDeleted: false },
      data: { status, updatedBy },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<IMemberResponse> {
    const deletedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const deletedMember = await this.PostgresPrismaService.members.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date(), deletedBy },
      include: { User: true },
    });

    return { id: deletedMember.id, userName: deletedMember.User.name };
  }

  async findOneByInformation(
    userId: string,
    projectId: string,
  ): Promise<IMemberResponse> {
    const find = await this.PostgresPrismaService.members.findFirst({
      where: { userId: userId, projectId: projectId, isDeleted: false },
      include: { User: true },
    });
    return find ? { id: find.id, userName: find.User.name } : null;
  }

  async restoreById(
    id: string,
    userLogin: IUserLogin,
  ): Promise<IMemberResponse> {
    const member = await this.PostgresPrismaService.members.findUnique({
      where: { id, isDeleted: true },
    });
    if (!member)
      throw new BadRequestException(
        MEMBER_MESSAGES.MEMBER_NOT_FOUND_OR_ALREADY_ACTIVE,
      );
    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const restoredMember = await this.PostgresPrismaService.members.update({
      where: { id: id },
      data: { isDeleted: false, deletedAt: null, deletedBy: null, updatedBy },
      include: { User: true },
    });
    return { id: restoredMember.id, userName: restoredMember.User.name };
  }
}
