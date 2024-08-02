// issues.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PostgresPrismaService } from 'src/prisma.service';
import { IIssueResponse } from 'src/interfaces/issue/issue-response.interface';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { FindIssuesByInformationDto } from './dto/find-issues-by-information.dto';

@Injectable()
export class IssuesService {
  constructor(private prisma: PostgresPrismaService) {}

  async create(
    createIssueDto: CreateIssueDto,
    userLogin: IUserLogin,
  ): Promise<IIssueResponse> {
    const { sprintId, projectId, ...payload } = createIssueDto;
    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    if (
      await this.prisma.issues.findUnique({
        where: { key: createIssueDto.key },
      })
    )
      throw new BadRequestException('Issue with this key already exists');
    if (
      createIssueDto.issueParrentId &&
      !(await this.findById(createIssueDto.issueParrentId))
    )
      throw new BadRequestException('Issue parent not found');
    if (sprintId && projectId)
      throw new BadRequestException(
        'Issue cannot be assigned to both sprint and project',
      );

    return this.prisma.issues.create({
      data: {
        ...payload,
        Sprint:
          sprintId && !projectId ? { connect: { id: sprintId } } : undefined,
        Project:
          !sprintId && projectId ? { connect: { id: projectId } } : undefined,
        createdBy,
      },
    });
  }

  async update(
    updateIssueDto: UpdateIssueDto,
    userLogin: IUserLogin,
  ): Promise<IIssueResponse> {
    const { id, ...data } = updateIssueDto;
    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    const issue = await this.prisma.issues.findUnique({ where: { id } });
    if (!issue) {
      throw new NotFoundException('Issue not found or deleted');
    }
    return this.prisma.issues.update({
      where: { id },
      data: {
        ...data,
        updatedBy,
      },
    });
  }

  async restore(id: string): Promise<IIssueResponse> {
    const issue = await this.prisma.issues.findUnique({
      where: { id, isDeleted: true },
    });
    if (!issue)
      throw new NotFoundException('Issue not found or already active');
    return this.prisma.issues.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null, deletedBy: null },
    });
  }

  async findById(id: string): Promise<IIssueResponse> {
    const issue = await this.prisma.issues.findUnique({
      where: { id, isDeleted: false },
      include: { Comments: true, Sprint: true },
    });
    return issue;
  }

  async find(query: FindIssuesByInformationDto): Promise<IIssueResponse[]> {
    const {
      projectId,
      sprintId,
      type,
      status,
      assigneeId,
      name,
      priority,
      reporterId,
    } = query;
    return this.prisma.issues.findMany({
      where: {
        isDeleted: false,
        OR: [
          { projectId },
          { sprintId },
          { type },
          { status },
          { priority },
          { name },
          { reporterId },
          { assigneeId },
        ],
      },
      include: { Comments: true, Project: true, Sprint: true },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<IIssueResponse> {
    const issue = await this.prisma.issues.findUnique({
      where: { id, isDeleted: false },
    });
    const deletedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    if (!issue) {
      throw new NotFoundException('Issue not found or deleted');
    }
    return this.prisma.issues.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy, isDeleted: true },
    });
  }
  // Lấy dữ liệu có sắp xếp (độ ưu tiên, trạng thái, vị trí trên bảng)
}
