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
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ICreateProjectFunctionResponse,
  IProjectResponse,
} from 'src/interfaces/project/project-response.interface';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { RolesRepository } from 'src/roles/roles.repository';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly rolesRepository: RolesRepository,
  ) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: IUserLogin,
  ): Promise<ICreateProjectFunctionResponse> {
    if (
      !this.rolesRepository.validateRole(
        'dbb3b204-7b9e-4b6d-90b7-5078d4b2c305',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        user,
      )
    )
      throw new ForbiddenException();
    return await this.projectsService.create(createProjectDto, user);
  }

  // @Get()
  // async findAll(@User() user: IUserLogin) {
  //   if (
  //     !this.rolesRepository.validateRole(
  //       'fdc0268d-2f6d-4b4d-8053-3e7a0a727cc4',
  //       '935b8157-0517-4ef1-9c0a-0744cf94af5a',
  //       user,
  //     )
  //   )
  //     throw new ForbiddenException();
  //   return this.projectsService.findAll();
  // }

  @Get('find-by-id/:id')
  async findOne(@Param('id') id: string, @User() user: IUserLogin) {
    return this.projectsService.findOneById(id);
  }

  @Get('find-by-creator')
  async findByCreator(@User() user: IUserLogin) {
    return await this.projectsService.findAllByCreator(user);
  }

  @Patch()
  async update(
    @Body() updateProjectDto: UpdateProjectDto,
    @User() user: IUserLogin,
  ) {
    if (
      !this.rolesRepository.validateRole(
        updateProjectDto.id,
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        user,
      )
    )
      throw new ForbiddenException();
    return this.projectsService.update(updateProjectDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUserLogin) {
    if (
      !this.rolesRepository.validateRole(
        id,
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        user,
      )
    )
      throw new ForbiddenException();
    return this.projectsService.remove(+id);
  }
}
