import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { Members, Projects } from '@prisma/postgres/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: IUserLogin,
  ): Promise<{
    project: Projects;
    members: Members[];
    conversation: any;
  }> {
    return await this.projectsService.create(createProjectDto, user);
  }

  // @Get()
  // async findAll(@User() user: IUserLogin) {
  //   return this.projectsService.findAll();
  // }

  @Get('find-by-id/:id')
  async findOne(@Param('id') id: string, @User() user: IUserLogin) {
    return { project: await this.projectsService.findOneById(id) };
  }

  @Get('find-by-assignee')
  async findByCreator(
    @User() user: IUserLogin,
  ): Promise<{ project: Projects[] }> {
    return { project: await this.projectsService.findAll(user) };
  }

  // @Patch()
  // async update(
  //   @Body() updateProjectDto: UpdateProjectDto,
  //   @User() user: IUserLogin,
  // ) {
  //   return this.projectsService.update(updateProjectDto, user);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUserLogin) {
    return this.projectsService.remove(+id);
  }
}
