import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SprintsService } from './sprints.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { ISprintResponse } from 'src/interfaces/sprint/sprint-response.interface';
import { User } from 'src/decorators/user.decorator';
import { FindSprintByProjectIdStatusDto } from './dto/find-sprints-by-projectid-&-status.dto';
import { RolesRepository } from 'src/roles/roles.repository';

@Controller('sprints')
export class SprintsController {
  constructor(
    private readonly sprintsService: SprintsService,
    private readonly rolesRepository: RolesRepository,
  ) {}

  @Post()
  async create(
    @Body() createSprintDto: CreateSprintDto,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    if (
      !this.rolesRepository.validateRole(
        'b73a59a7-3e6c-4eb0-9f26-562b73e1e2e9',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return this.sprintsService.create(createSprintDto, userLogin);
  }

  @Patch()
  async update(
    @Body() updateSprintDto: UpdateSprintDto,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    if (
      !this.rolesRepository.validateRole(
        'c6ed3d59-d839-4568-8f11-b6e74a22a4d3',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.update(updateSprintDto, userLogin);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string, @User() userLogin: IUserLogin) {
    if (
      !this.rolesRepository.validateRole(
        'be1d0d95-8f60-465d-bf41-f1b97d04d9b3',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.restore(id);
  }

  @Get('find-one-by-id/:id')
  async findById(
    @Param('id') id: string,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    if (
      !this.rolesRepository.validateRole(
        '98e27cb2-8b3c-4706-bfe0-50a18c5cf486',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.findById(id);
  }

  @Get()
  async findMany(
    @Query() query: FindSprintByProjectIdStatusDto,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse[]> {
    if (
      !this.rolesRepository.validateRole(
        'fb8d95ff-c69c-4ed6-a198-b6372c7c3151',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.find(query);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() userLogin: IUserLogin) {
    if (
      !this.rolesRepository.validateRole(
        'a104b572-c1d0-47b6-b17f-4b6e1d4504af',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.remove(id, userLogin);
  }

  @Get('start-sprint/:id')
  async startSprint(@Param('id') id: string, @User() userLogin: IUserLogin) {
    if (
      !this.rolesRepository.validateRole(
        'cbf2fd12-efc4-40ed-9046-3d8c59b47f0d',
        '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        userLogin,
      )
    )
      throw new ForbiddenException();
    return await this.sprintsService.startSprint(id, userLogin);
  }
}
