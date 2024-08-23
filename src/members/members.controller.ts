import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IMemberResponse } from 'src/interfaces/member/member.interface';
import { User } from 'src/decorators/user.decorator';
import { Members } from '@prisma/postgres/client';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // @Post()
  // async create(
  //   @Body() createMemberDto: CreateMemberDto,
  //   @User() userLogin: IUserLogin,
  // ) {
  //   return await this.membersService.create(createMemberDto, userLogin);
  // }

  @Get(':projectId')
  async findAllByProjectId(@Param('projectId') projectId: string) {
    return { members: await this.membersService.findAllByProjectId(projectId) };
  }

  // @Patch()
  // async update(
  //   @Body() updateMemberDto: UpdateMemberDto,
  //   @User() user: IUserLogin,
  // ): Promise<Members> {
  //   return await this.membersService.update(updateMemberDto, user);
  // }

  // @Delete(':id')
  // async remove(
  //   @Param('id') id: string,
  //   @User() userLogin: IUserLogin,
  // ): Promise<IMemberResponse> {
  //   return this.membersService.remove(id, userLogin);
  // }

  // @Get('find')
  // async findOneByInformation(
  //   @Param('userId') userId: string,
  //   @Param('projectId') projectId: string,
  // ): Promise<IMemberResponse> {
  //   return this.membersService.findOneByInformation(userId, projectId);
  // }

  // @Post('restore/:id')
  // async restoreById(
  //   @Param('id') id: string,
  //   @User() userLogin: IUserLogin,
  // ): Promise<IMemberResponse> {
  //   return this.membersService.restoreById(id, userLogin);
  // }
}
