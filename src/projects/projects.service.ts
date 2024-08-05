import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { PROJECT_MESSAGES } from 'src/constants/messages/project.message';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { ConversationsService } from 'src/conversations/conversations.service';
import { MembersService } from 'src/members/members.service';
import { UsersService } from 'src/users/users.service';
import { IConversationResponse } from 'src/interfaces/conversation/conversation-response.interface';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { type Members, type Projects } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(
    private PostgresPrismaService: PostgresPrismaService,
    private conversationService: ConversationsService,
    private memberService: MembersService,
    private usersService: UsersService,
  ) {}
  async create(
    createProjectDto: CreateProjectDto,
    userLogin: IUserLogin,
  ): Promise<{
    project: Projects;
    members: Members[];
    conversation: any;
  }> {
    const { memberIds, ...payload } = createProjectDto;

    if (
      await this.PostgresPrismaService.projects.findUnique({
        where: { name: payload.name },
      })
    )
      throw new BadRequestException({
        message: PROJECT_MESSAGES.PROJECT_IS_ALREADY_EXIST,
      });
    for (const id of memberIds) {
      if (!(await this.usersService.findOneById(id)))
        throw new BadRequestException({
          message: PROJECT_MESSAGES.MEMBER_NOT_FOUND,
        });
    }
    const payloadMemberIds: string[] = [
      userLogin.id,
      ...createProjectDto.memberIds,
    ];
    const project: Projects = await this.PostgresPrismaService.projects.create({
      data: {
        key: createProjectDto.name.replace(/\s/g, '-').toLowerCase(),
        ...payload,
      },
    });
    const conversation: IConversationResponse =
      await this.conversationService.create(
        {
          title: createProjectDto.name,
          participantIds: payloadMemberIds,
          projectId: project.id,
        },
        userLogin,
      );
    const members: Members[] = await Promise.all(
      payloadMemberIds.map(async (id: string) => {
        return await this.memberService.create(
          { projectId: project.id },
          userLogin,
        );
      }),
    );
    return { project, members, conversation };
  }

  async findAll(userLogin: IUserLogin): Promise<Projects[]> {
    const projects = await this.PostgresPrismaService.projects.findMany({
      where: { defaultAssignee: userLogin.id },
    });
    return projects;
  }

  async findOneById(id: string): Promise<Projects> {
    return await this.PostgresPrismaService.projects.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
