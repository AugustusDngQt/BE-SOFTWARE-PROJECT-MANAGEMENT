import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IMemberResponse } from 'src/interfaces/member/member.interface';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma.service';
import { IExecutor } from 'src/interfaces/executor.interface';

@Injectable()
export class MembersService {
  constructor(private prismaService: PrismaService) {}
  async create(
    createMemberDto: CreateMemberDto,
    userLogin: IUserLogin,
  ): Promise<IMemberResponse> {
    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    const createdMember = await this.prismaService.members.create({
      data: {
        user: { connect: { id: createMemberDto.userId } },
        project: { connect: { id: createMemberDto.projectId } },
        createdBy,
      },
      include: { user: true, project: true },
    });

    const member: IMemberResponse = {
      id: createdMember.id,
      userName: createdMember.user.name,
    };
    return member;
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
