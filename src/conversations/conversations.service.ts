import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'mongodb/schemas/Conversation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}
  create(createConversationDto: CreateConversationDto) {
    const data = {
      id: 'conv1',
      title: 'Test Conversation',
      createdAt: '2024-07-28T12:00:00Z',
      updatedAt: '2024-07-28T12:00:00Z',
      createdBy: {
        id: 'user1',
        name: 'John Doe',
      },
      updatedBy: {
        id: 'user2',
        name: 'Jane Doe',
      },
      deletedAt: null,
      deletedBy: null,
      participants: [
        {
          id: 'user1',
          name: 'John Doe',
        },
        {
          id: 'user2',
          name: 'Jane Doe',
        },
      ],
    };
    const createdConversation = new this.conversationModel(data);
    createdConversation.save();
    return 'This action adds a new conversation';
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
