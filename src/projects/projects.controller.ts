import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ICreateProjectFunctionResponse } from 'src/interfaces/project/project-response.interface';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @User() user: IUserLogin,
  ): Promise<ICreateProjectFunctionResponse> {
    return await this.projectsService.create(createProjectDto, user);
  }

  @Get()
  findAll() {
    // return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOneById(id);
  }

  @Patch()
  update(@Body() updateProjectDto: UpdateProjectDto, @User() user: IUserLogin) {
    return this.projectsService.update(updateProjectDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
