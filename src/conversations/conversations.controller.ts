import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IConversationResponse } from 'src/interfaces/conversation/conversation-response.interface';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async create(
    @Body() createConversationDto: CreateConversationDto,
    @User() user: IUserLogin,
  ) {
    return await this.conversationsService.create(createConversationDto, user);
  }

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }

  @Get('find-by-project-id/:id')
  async findOne(
    @Param('id') projectId: string,
  ): Promise<{ conversation: any }> {
    return {
      conversation:
        await this.conversationsService.findOneByProjectId(projectId),
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(+id);
  }
}
