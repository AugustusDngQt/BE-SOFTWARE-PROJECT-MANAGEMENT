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
import { SprintsService } from 'src/sprints/sprints.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ISSUES_MESSAGES } from 'src/constants/messages/issue.message';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PostgresPrismaService,
    private sprintsService: SprintsService,
    private projectsService: ProjectsService,
  ) {}

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
      throw new BadRequestException(ISSUES_MESSAGES.ISSUE_ALREADY_EXISTS);
    if (
      createIssueDto.issueParrentId &&
      !(await this.findById(createIssueDto.issueParrentId))
    )
      throw new BadRequestException(ISSUES_MESSAGES.ISSUE_PARENT_NOT_FOUND);
    if (sprintId && projectId)
      throw new BadRequestException(ISSUES_MESSAGES.ISSUE_INVALID_ASSIGNMENT);
    else if (sprintId && !(await this.sprintsService.findById(sprintId)))
      throw new BadRequestException(ISSUES_MESSAGES.SPRINT_NOT_FOUND);
    else if (projectId && !(await this.projectsService.findOneById(projectId)))
      throw new BadRequestException(ISSUES_MESSAGES.PROJECT_NOT_FOUND);

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
    const issue = await this.findById(id);
    if (!issue) {
      throw new NotFoundException(ISSUES_MESSAGES.ISSUE_NOT_FOUND_OR_DELETED);
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
    const issue = await this.findById(id);
    if (!issue)
      throw new NotFoundException(
        ISSUES_MESSAGES.ISSUE_NOT_FOUND_OR_ALREADY_ACTIVE,
      );
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
      throw new NotFoundException(ISSUES_MESSAGES.ISSUE_NOT_FOUND_OR_DELETED);
    }
    return this.prisma.issues.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy, isDeleted: true },
    });
  }
  // Lấy dữ liệu có sắp xếp (độ ưu tiên, trạng thái, vị trí trên bảng)
}
