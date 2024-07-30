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
      role: userLogin.role,
    };

    const conversation = await this.mongoPrismaService.conversations.create({
      data: {
        title: createConversationDto.title,
        participants: participants as unknown as Prisma.JsonArray,
        createdBy: createdBy as unknown as Prisma.JsonObject,
      },
    });

    return {
      id: conversation.id,
      title: conversation.title,
      participants:
        conversation.participants as unknown as IConversationParticipant[],
    };
  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
