import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { FindIssuesByInformationDto } from './dto/find-issues-by-information.dto';
import { SprintsService } from 'src/sprints/sprints.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ISSUES_MESSAGES } from 'src/constants/messages/issue.message';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { ESprintStatus } from 'src/enum/sprint.enum';
import { Issues, Users } from '@prisma/client';
import { EIssueStatus } from 'src/enum/issue.enum';
import { UsersService } from 'src/users/users.service';
import { IssueType } from 'src/type/issue.type';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PostgresPrismaService,
    @Inject(forwardRef(() => SprintsService))
    private sprintsService: SprintsService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  async create(
    createIssueDto: CreateIssueDto,
    userLogin: IUserLogin,
  ): Promise<Issues> {
    const { sprintId, ...payload } = createIssueDto;
    if (payload.parentId && !(await this.findById(createIssueDto.parentId)))
      throw new BadRequestException(ISSUES_MESSAGES.ISSUE_PARENT_NOT_FOUND);
    if (sprintId && !(await this.sprintsService.findById(sprintId)))
      throw new BadRequestException(ISSUES_MESSAGES.SPRINT_NOT_FOUND);
    const issues = await this.prisma.issues.findMany({
      where: { creatorId: userLogin.id },
    });
    const sprintIssues = issues.filter(
      (issue) => issue.sprintId === sprintId && issue.isDeleted === false,
    );
    let boardPosition = -1;
    const sprint = sprintId
      ? await this.sprintsService.findById(sprintId)
      : null;
    if (sprint && sprint.status === ESprintStatus.ACTIVE) {
      const issuesInColumn = sprintIssues.filter(
        (issue) => issue.status === EIssueStatus.TODO,
      );
      boardPosition = this.calculateInsertPosition(issuesInColumn);
    }

    return await this.prisma.issues.create({
      data: {
        ...payload,
        reporterId: userLogin.id,
        Sprint: sprintId ? { connect: { id: sprintId } } : undefined,
        key: sprintId
          ? `Issue-${issues.length + 1} (${sprint.name})`
          : `Issue-${issues.length + 1}`,
        creatorId: userLogin.id,
        sprintPosition: this.calculateInsertPosition(sprintIssues),
        boardPosition,
      },
    });
  }

  calculateInsertPosition(issues: Issues[]) {
    return Math.max(...issues.map((issue) => issue.sprintPosition), 0) + 1;
  }

  async update(
    id: string,
    updateIssueDto: UpdateIssueDto,
    userLogin: IUserLogin,
  ): Promise<Issues> {
    const { sprintId, ...payload } = updateIssueDto;
    const issue = await this.findById(id);
    if (!issue)
      throw new NotFoundException(ISSUES_MESSAGES.ISSUE_NOT_FOUND_OR_DELETED);

    if (
      updateIssueDto.reporterId &&
      !(await this.usersService.findOneById(updateIssueDto.reporterId))
    )
      throw new BadRequestException(ISSUES_MESSAGES.REPORTER_NOT_FOUND);
    if (
      updateIssueDto.assigneeId &&
      !(await this.usersService.findOneById(updateIssueDto.assigneeId))
    )
      throw new BadRequestException(ISSUES_MESSAGES.ASSIGNEE_NOT_FOUND);

    return await this.prisma.issues.update({
      where: { id },
      data: {
        ...payload,
        Sprint: sprintId ? { connect: { id: sprintId } } : undefined,
      },
    });
  }

  async findById(id: string): Promise<Issues> {
    const issue = await this.prisma.issues.findUnique({
      where: { id, isDeleted: false },
    });
    return issue;
  }

  async find(
    userLogin: IUserLogin,
  ): Promise<Issues[] | (Issues & { assignee: Users })[]> {
    const issues = await this.prisma.issues.findMany({
      where: {
        isDeleted: false,
      },
    });
    const issuesWithAssignee = await Promise.all(
      issues.map(async (issue) => {
        const assignee =
          issue.assigneeId !== null
            ? await this.usersService.findOneById(issue.assigneeId)
            : {};
        const reporter =
          issue.reporterId !== null
            ? await this.usersService.findOneById(issue.reporterId)
            : {};

        return { ...issue, assignee, reporter };
      }),
    );
    return issuesWithAssignee;
  }

  async findAll(userLogin: IUserLogin): Promise<Issues[]> {
    const issues = await this.prisma.issues.findMany({
      where: { creatorId: userLogin.id, isDeleted: false },
    });
    if (issues.length === 0) return issues;

    const activeSprints = await this.prisma.sprints.findMany({
      where: { status: ESprintStatus.ACTIVE },
    });

    const userIds = issues
      .flatMap((issue) => [issue.assigneeId, issue.reporterId] as string[])
      .filter(Boolean);

    const users = await this.prisma.users.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    const issuesForClient = this.generateIssuesForClient(
      issues,
      users,
      activeSprints.map((sprint) => sprint.id),
    );

    return null;
  }

  async remove(id: string, userLogin: IUserLogin): Promise<Issues> {
    const issue = await this.prisma.issues.findUnique({
      where: { id, isDeleted: false },
    });
    if (!issue) {
      throw new NotFoundException(ISSUES_MESSAGES.ISSUE_NOT_FOUND_OR_DELETED);
    }
    return await this.prisma.issues.update({
      where: { id },
      data: { deletedAt: new Date(), isDeleted: true },
    });
  }
  generateIssuesForClient(
    issues: Issues[],
    users: Users[],
    activeSprintIds?: string[],
  ) {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const parentMap = new Map(issues.map((issue) => [issue.id, issue]));

    const issuesForClient = issues.map((issue) => {
      const parent = parentMap.get(issue.parentId ?? '') ?? null;
      const assignee = userMap.get(issue.assigneeId ?? '') ?? null;
      const reporter = userMap.get(issue.reporterId) ?? null;
      const children = issues
        .filter((i) => i.parentId === issue.id)
        .map((issue) => {
          const assignee = userMap.get(issue.assigneeId ?? '') ?? null;
          return Object.assign(issue, { assignee });
        });
      const sprintIsActive = activeSprintIds?.includes(issue.sprintId ?? '');
      return { ...issue, sprintIsActive, parent, assignee, reporter, children };
    });

    return issuesForClient as IssueType[];
  }
}
