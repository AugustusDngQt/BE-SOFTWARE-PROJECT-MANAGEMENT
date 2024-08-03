// sprints.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { ISprintResponse } from 'src/interfaces/sprint/sprint-response.interface';
import { PostgresPrismaService } from 'src/prisma.service';
import { SPRINT_MESSAGES } from 'src/constants/messages/sprint.message'; // Import messages
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { ESprintStatus } from 'src/enum/sprint.enum';
import type { Sprints } from '@prisma/client';
import { FindSprintByProjectIdStatusDto } from './dto/find-sprints-by-projectid-&-status.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { PROJECT_MESSAGES } from 'src/constants/messages/project.message';

@Injectable()
export class SprintsService {
  constructor(
    private PostgresPrismaService: PostgresPrismaService,
    private projectService: ProjectsService,
  ) {}

  async create(
    createSprintDto: CreateSprintDto,
    userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    const { projectId, ...payload } = createSprintDto;
    if (
      !(await this.PostgresPrismaService.projects.findUnique({
        where: { id: createSprintDto.projectId },
      }))
    )
      throw new BadRequestException(SPRINT_MESSAGES.PROJECT_NOT_FOUND);

    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    const sprint: ISprintResponse =
      await this.PostgresPrismaService.sprints.create({
        data: {
          description: createSprintDto.description
            ? createSprintDto.description
            : '',
          ...payload,
          project: { connect: { id: projectId } },
          status: ESprintStatus.ACTIVE,
          createdBy,
        },
      });

    return sprint;
  }

  async update(
    updateSprintDto: UpdateSprintDto,
    userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    const { id, ...payload } = updateSprintDto;
    const updatedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const existingSprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id, isDeleted: false },
    });
    if (!existingSprint) {
      throw new BadRequestException(SPRINT_MESSAGES.SPRINT_NOT_FOUND);
    }
    if (
      payload.status &&
      !Object.values(ESprintStatus).includes(payload.status as ESprintStatus)
    ) {
      throw new BadRequestException(SPRINT_MESSAGES.INVALID_STATUS);
    }
    const updatedSprint = await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { ...payload, updatedBy },
    });

    return updatedSprint;
  }

  async restore(id: string): Promise<ISprintResponse> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id, isDeleted: true },
    });
    if (!sprint) {
      throw new NotFoundException(SPRINT_MESSAGES.SPRINT_NOT_FOUND_OR_RESTORED);
    }
    return await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null, deletedBy: null },
    });
  }

  async findById(id: string): Promise<ISprintResponse> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id, isDeleted: false },
      include: { issues: true, Assignee: true },
    });
    return sprint;
  }

  async find(
    query: FindSprintByProjectIdStatusDto,
  ): Promise<ISprintResponse[]> {
    const { projectId, status } = query;
    if (!(await this.projectService.findOneById(projectId)))
      throw new BadRequestException(PROJECT_MESSAGES.PROJECT_IS_NOT_FOUND);

    return await this.PostgresPrismaService.sprints.findMany({
      where: {
        isDeleted: false,
        projectId,
        status: status ? status : undefined,
      },
      include: { issues: true, Assignee: true },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<ISprintResponse> {
    const deletedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    if (!sprint) {
      throw new NotFoundException(SPRINT_MESSAGES.SPRINT_NOT_FOUND);
    }
    return await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { deletedBy, deletedAt: new Date(), isDeleted: true },
    });
  }
}
