import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { ISprintResponse } from 'src/interfaces/sprint/sprint-response.interface';
import { PostgresPrismaService } from 'src/prisma.service';
import { SPRINT_MESSAGES } from 'src/constants/messages/sprint.message';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { IExecutor } from 'src/interfaces/executor.interface';
import { ESprintStatus } from 'src/enum/sprint.enum';
import type { Sprints } from '@prisma/client';

@Injectable()
export class SprintsService {
  constructor(private PostgresPrismaService: PostgresPrismaService) {}

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
      throw new BadRequestException({
        message: SPRINT_MESSAGES.PROJECT_NOT_FOUND,
      });

    const createdBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
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

  async findAllByProjectId(projectId: string): Promise<ISprintResponse[]> {
    const sprints: Sprints[] =
      await this.PostgresPrismaService.sprints.findMany({
        where: { projectId },
        include: { issues: true, Assignee: true },
      });
    return sprints;
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
      role: userLogin.role,
    };
    const existingSprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    if (!existingSprint) {
      throw new BadRequestException({
        message: SPRINT_MESSAGES.SPRINT_NOT_FOUND,
      });
    }
    if (
      payload.status &&
      !Object.values(ESprintStatus).includes(payload.status as ESprintStatus)
    ) {
      throw new BadRequestException({
        message: SPRINT_MESSAGES.INVALID_STATUS,
      });
    }
    const updatedSprint = await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { ...payload, updatedBy },
    });

    return updatedSprint;
  }
  async restore(id: string): Promise<ISprintResponse> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    if (!sprint || !sprint.deletedAt) {
      throw new NotFoundException('Sprint not found or already active');
    }
    return await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { isDeleted: false, deletedAt: null, deletedBy: null },
    });
  }

  async findById(id: string): Promise<ISprintResponse> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id, isDeleted: false },
    });
    if (!sprint) {
      throw new NotFoundException('Sprint not found');
    }
    return sprint;
  }

  async find(query: {
    projectId?: string;
    status?: string;
  }): Promise<ISprintResponse[]> {
    const { projectId, status } = query;
    return this.PostgresPrismaService.sprints.findMany({
      where: {
        isDeleted: false,
        ...(projectId ? { projectId } : {}),
        ...(status ? { status } : {}),
      },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<ISprintResponse> {
    const deletedBy: IExecutor = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      role: userLogin.role,
    };
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    if (!sprint) {
      throw new NotFoundException('Sprint not found or deleted');
    }
    return this.PostgresPrismaService.sprints.update({
      where: { id },
      data: { deletedBy, deletedAt: new Date(), isDeleted: true },
    });
  }
}
