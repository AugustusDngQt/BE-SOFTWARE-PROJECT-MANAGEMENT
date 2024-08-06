import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MongoPrismaService } from 'src/database/mongo-prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: MongoPrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.messages.create({ data: createMessageDto });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  async findByConversationId(projectId: string) {
    const conversation = await this.prisma.conversations.findUnique({
      where: { projectId },
    });
    if (!conversation) throw new BadRequestException('Conversation not found');
    return this.prisma.messages.findMany({
      where: { conversationId: conversation.id },
    });
  }
}
