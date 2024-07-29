import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'mongodb/schemas/Conversation.schema';
import { Model } from 'mongoose';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IUserResponse } from 'src/interfaces/user/user-response.interface';
import { UsersService } from 'src/users/users.service';
import { IParticipant } from 'src/interfaces/message/participant.interface';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private usersService: UsersService,
  ) {}
  async create(
    createConversationDto: CreateConversationDto,
    userLogin: IUserLogin,
  ): Promise<Conversation> {
    const participants: IParticipant[] = await Promise.all(
      createConversationDto.participantIds.map(async (id: string) => {
        const user: IUserResponse = await this.usersService.findOneById(id);
        return { id: user.id, name: user.name, email: user.email };
      }),
    );
    const data = {
      title: createConversationDto.title,
      participants,
      createdBy: {
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email,
        role: userLogin.role,
      },
    };
    const createdConversation = new this.conversationModel(data);
    const conversation = await createdConversation.save();
    return conversation;
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
