// sprints.service.ts
import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SPRINT_MESSAGES } from 'src/constants/messages/sprint.message'; // Import messages
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { ESprintStatus } from 'src/enum/sprint.enum';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { Sprints } from '@prisma/postgres/client';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class SprintsService {
  constructor(
    private PostgresPrismaService: PostgresPrismaService,
    @Inject(forwardRef(() => ProjectsService))
    private projectsService: ProjectsService,
  ) {}

  async create(userLogin: IUserLogin): Promise<Sprints> {
    const count = await this.PostgresPrismaService.sprints.count({
      where: { creatorId: userLogin.id },
    });
    const sprint: Sprints = await this.PostgresPrismaService.sprints.create({
      data: {
        name: `Sprint-${count}`,
        creatorId: userLogin.id,
      },
    });

    return sprint;
  }

  async update(
    id: string,
    updateSprintDto: UpdateSprintDto,
    userLogin: IUserLogin,
  ): Promise<Sprints> {
    return await this.PostgresPrismaService.sprints.update({
      where: { id },
      data: updateSprintDto,
    });
  }

  // async restore(id: string): Promise<ISprintResponse> {
  //   const sprint = await this.PostgresPrismaService.sprints.findUnique({
  //     where: { id, isDeleted: true },
  //   });
  //   if (!sprint) {
  //     throw new NotFoundException(SPRINT_MESSAGES.SPRINT_NOT_FOUND_OR_RESTORED);
  //   }
  //   return await this.PostgresPrismaService.sprints.update({
  //     where: { id },
  //     data: { isDeleted: false, deletedAt: null, deletedBy: null },
  //   });
  // }

  async findById(id: string): Promise<Sprints> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    return sprint;
  }

  async find(userLogin: IUserLogin): Promise<Sprints[]> {
    return await this.PostgresPrismaService.sprints.findMany({
      where: {
        OR: [
          { status: ESprintStatus.ACTIVE },
          { status: ESprintStatus.PENDING },
        ],
      },
    });
  }

  async remove(id: string, userLogin: IUserLogin): Promise<Sprints> {
    const sprint = await this.PostgresPrismaService.sprints.findUnique({
      where: { id },
    });
    if (!sprint) {
      throw new NotFoundException(SPRINT_MESSAGES.SPRINT_NOT_FOUND);
    }
    await this.PostgresPrismaService.issues.updateMany({
      where: { sprintId: id },
      data: { sprintId: null },
    });
    return await this.PostgresPrismaService.sprints.delete({
      where: { id },
    });
  }
}
