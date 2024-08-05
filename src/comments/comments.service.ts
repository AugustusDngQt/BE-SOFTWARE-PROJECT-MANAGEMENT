import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments, Users } from '@prisma/client';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { UsersService } from 'src/users/users.service';
import { UserMessages } from 'src/constants/messages/user.message';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PostgresPrismaService,
    private usersService: UsersService,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    userLogin: IUserLogin,
  ): Promise<Comments & { author: Users }> {
    const user = await this.usersService.findOneById(userLogin.id);
    if (!user) throw new BadRequestException(UserMessages.USER_NOT_FOUND);
    const comment = await this.prisma.comments.create({
      data: {
        content: createCommentDto.content,
        authorId: userLogin.id,
        Issue: { connect: { id: createCommentDto.issueId } },
      },
    });
    return { ...comment, author: user };
  }

  async findAll(
    issueId: string,
  ): Promise<Comments[] | (Comments & { author: Users })[]> {
    const comments = await this.prisma.comments.findMany({
      where: { issueId },
    });
    const commentsWithAuthor = await Promise.all(
      comments.map(async (comment: Comments) => {
        const author = await this.usersService.findOneById(comment.authorId);
        return { ...comment, author };
      }),
    );
    return commentsWithAuthor;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
