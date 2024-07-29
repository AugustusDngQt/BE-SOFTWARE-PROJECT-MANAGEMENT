import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ICreateProjectFunctionResponse,
  IProjectResponse,
} from 'src/interfaces/project/project-response.interface';
import { PrismaService } from 'src/prisma.service';
import { PROJECT_MESSAGES } from 'src/constants/messages/project.message';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { ConversationsService } from 'src/conversations/conversations.service';
import { MembersService } from 'src/members/members.service';
import { UsersService } from 'src/users/users.service';
import { IMemberResponse } from 'src/interfaces/member/member.interface';

@Injectable()
export class ProjectsService {
  constructor(
    private prismaService: PrismaService,
    private conversationService: ConversationsService,
    private memberService: MembersService,
    private usersService: UsersService,
  ) {}
  async create(
    createProjectDto: CreateProjectDto,
    userLogin: IUserLogin,
  ): Promise<ICreateProjectFunctionResponse> {
    const { memberIds, ...payload } = createProjectDto;
    if (await this.findOneByUniqueField(createProjectDto.name))
      throw new BadRequestException({
        message: PROJECT_MESSAGES.PROJECT_IS_ALREADY_EXIST,
      });
    for (const id of memberIds) {
      if (!(await this.usersService.findOneById(id)))
        throw new BadRequestException({
          message: PROJECT_MESSAGES.MEMBER_NOT_FOUND,
        });
    }
    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    const payloadMemberIds: string[] = [
      userLogin.id,
      ...createProjectDto.memberIds,
    ];
    const project: IProjectResponse = await this.prismaService.projects.create({
      data: {
        ...payload,
        createdBy,
      },
    });
    const conversation = await this.conversationService.create(
      {
        title: createProjectDto.name,
        participantIds: payloadMemberIds,
      },
      userLogin,
    );
    const members: IMemberResponse[] = await Promise.all(
      payloadMemberIds.map(async (id: string) => {
        return await this.memberService.create(
          { userId: id, projectId: project.id },
          userLogin,
        );
      }),
    );
    // tạo các members
    // tạo conversations với members
    return { project, members, conversation };
  }

  async findAllByCreator(userLogin: IUserLogin): Promise<IProjectResponse[]> {
    const projects: IProjectResponse[] =
      await this.prismaService.projects.findMany({ where: {} });
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async findOneByUniqueField(value: string): Promise<IProjectResponse> {
    const project: IProjectResponse =
      await this.prismaService.projects.findUnique({
        where: { name: value },
        include: { Sprints: true, Members: true },
      });
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
