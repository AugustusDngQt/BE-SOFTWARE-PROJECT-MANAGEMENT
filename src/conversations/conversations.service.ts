import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';
import { UsersService } from 'src/users/users.service';
import { IConversationParticipant } from 'src/interfaces/conversation/conversation-response.interface';
import { MongoPrismaService } from 'src/database/mongo-prisma.service';
import { IExecutor } from 'src/interfaces/executor.interface';
import { IConversationResponse } from 'src/interfaces/conversation/conversation-response.interface';
import { Prisma } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

@Injectable()
export class ConversationsService {
  constructor(
    private usersService: UsersService,
    private mongoPrismaService: MongoPrismaService,
  ) {}
  async create(
    createConversationDto: CreateConversationDto,
    userLogin: IUserLogin,
  ): Promise<IConversationResponse> {
    const participants: IConversationParticipant[] = await Promise.all(
      createConversationDto.participantIds.map(async (id: string) => {
        const user: IUserResponse = await this.usersService.findOneById(id);
        return { id: user.id, name: user.name, email: user.email };
      }),
    );

    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    const conversation = await this.mongoPrismaService.conversations.create({
      data: {
        title: createConversationDto.title,
        participants: participants as unknown as JsonArray,
        createdBy: createdBy,
        projectId: createConversationDto.projectId
          ? createConversationDto.projectId
          : null,
      },
    });

    return {
      id: conversation.id,
      title: conversation.title,
      participants:
        conversation.participants as unknown as IConversationParticipant[],
      projectId: conversation.projectId ? conversation.projectId : null,
    };
  }

  findAll() {
    return `This action returns all conversations`;
  }

  async findOneById(id: string) {
    return await this.mongoPrismaService.conversations.findUnique({
      where: { id },
    });
  }

  async findOneByProjectId(projectId: string): Promise<IConversationResponse> {
    const foundConversation =
      await this.mongoPrismaService.conversations.findUnique({
        where: { projectId },
      });
    return foundConversation
      ? {
          id: foundConversation.id,
          title: foundConversation.title,
          participants:
            foundConversation.participants as unknown as IConversationParticipant[],
          projectId: foundConversation.projectId,
        }
      : null;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  async updateParticipantsByProjectId(
    projectId: string,
    participants: IConversationParticipant[],
    userLogin: IUserLogin,
  ): Promise<IConversationResponse> {
    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const updatedConversation =
      await this.mongoPrismaService.conversations.update({
        where: { projectId },
        data: {
          participants: participants as unknown as JsonArray,
          updatedBy,
        },
      });
    return {
      id: updatedConversation.id,
      title: updatedConversation.title,
      participants:
        updatedConversation.participants as unknown as IConversationParticipant[],
      projectId: updatedConversation.projectId,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
