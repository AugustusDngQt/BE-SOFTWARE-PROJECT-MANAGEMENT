import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ICreateProjectFunctionResponse,
  IProjectResponse,
} from 'src/interfaces/project/project-response.interface';
import { PostgresPrismaService } from 'src/prisma.service';
import { PROJECT_MESSAGES } from 'src/constants/messages/project.message';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { ConversationsService } from 'src/conversations/conversations.service';
import { MembersService } from 'src/members/members.service';
import { UsersService } from 'src/users/users.service';
import { IMemberResponse } from 'src/interfaces/member/member.interface';
import {
  IUpdateMembers,
  IUpdateProjectFunctionResponse,
} from 'src/interfaces/project/update-project.interface';
import { ETypeUpdateMember } from 'src/enum/project.enum';
import {
  IConversationParticipant,
  IConversationResponse,
} from 'src/interfaces/conversation/conversation-response.interface';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';

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
    const project: IProjectResponse =
      await this.PostgresPrismaService.projects.create({
        data: {
          ...payload,
          createdBy,
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
    const members: IMemberResponse[] = await Promise.all(
      payloadMemberIds.map(async (id: string) => {
        return await this.memberService.create(
          { userId: id, projectId: project.id },
          userLogin,
        );
      }),
    );
    return { project, members, conversation };
  }

  async findAllByCreator(userLogin: IUserLogin): Promise<IProjectResponse[]> {
    const projects: IProjectResponse[] =
      await this.PostgresPrismaService.projects.findMany({ where: {} });
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async findOneById(id: string): Promise<IProjectResponse> {
    return await this.PostgresPrismaService.projects.findUnique({
      where: { id },
    });
  }

  async findOneByUniqueField(value: string): Promise<IProjectResponse> {
    const project: IProjectResponse =
      await this.PostgresPrismaService.projects.findUnique({
        where: { name: value },
        include: { Sprints: true, Members: true },
      });
    return project;
  }

  async update(
    updateProjectDto: UpdateProjectDto,
    userLogin: IUserLogin,
  ): Promise<IUpdateProjectFunctionResponse> {
    const { id, memberUpdates, ...payload } = updateProjectDto;
    if (!(await this.findOneById(id)))
      throw new BadRequestException({
        message: PROJECT_MESSAGES.PROJECT_IS_NOT_FOUND,
      });
    if (memberUpdates && memberUpdates.length > 0) {
      const memberAdds: IUpdateMembers[] = memberUpdates.filter(
        (memberUpdate: IUpdateMembers) =>
          memberUpdate.type === ETypeUpdateMember.ADD,
      );
      const memberRemoves: IUpdateMembers[] = memberUpdates.filter(
        (memberUpdate: IUpdateMembers) =>
          memberUpdate.type === ETypeUpdateMember.REMOVE,
      );
      const conversations: IConversationResponse =
        await this.conversationService.findOneByProjectId(updateProjectDto.id);
      let participants: IConversationParticipant[] = conversations.participants;
      for (const memberRemove of memberRemoves) {
        if (
          memberRemove.type === ETypeUpdateMember.REMOVE &&
          !(await this.memberService.findOneById(memberRemove.id))
        )
          throw new BadRequestException({
            message: PROJECT_MESSAGES.MEMBER_NOT_FOUND,
          });
      }
      await Promise.all([
        ...memberAdds.map(async (memberAdd: IUpdateMembers) => {
          const isMemberExist = await this.memberService.findOneByInformation(
            memberAdd.idUser,
            id,
          );
          if (isMemberExist) {
            await this.memberService.restoreById(isMemberExist.id, userLogin);
          } else {
            await this.memberService.create(
              { userId: memberAdd.idUser, projectId: id },
              userLogin,
            );
          }

          const user: IUserResponse = await this.usersService.findOneById(
            memberAdd.idUser,
          );
          participants.push({
            id: user.id,
            name: user.name,
            email: user.email,
          });
        }),
        ...memberRemoves.map(async (memberRemove: IUpdateMembers) => {
          const removedMember = await this.memberService.remove(
            memberRemove.id,
            userLogin,
          );
          participants = participants.filter(
            (item: IConversationParticipant) =>
              item.id !== removedMember.userId,
          );
        }),
      ]);
      await this.conversationService.updateParticipantsByProjectId(
        updateProjectDto.id,
        participants,
        userLogin,
      );
    }
    const members: IMemberResponse[] =
      await this.memberService.findAllByProjectId(id);
    const project: IProjectResponse =
      await this.PostgresPrismaService.projects.update({
        where: { id },
        data: { ...payload },
      });
    return { project, members };
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
