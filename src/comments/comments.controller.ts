import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments, Users } from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: IUserLogin,
  ): Promise<{ comment: Comments & { author: Users } }> {
    return {
      comment: await this.commentsService.create(createCommentDto, user),
    };
  }

  @Get(':issueId')
  async findAll(@Param('issueId') issueId: string): Promise<{
    comments: Comments[] | (Comments & { author: Users })[];
  }> {
    return { comments: await this.commentsService.findAll(issueId) };
  }

  @Get('/find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
