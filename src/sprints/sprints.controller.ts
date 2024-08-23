import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SprintsService } from './sprints.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { User } from 'src/decorators/user.decorator';
import { RolesRepository } from 'src/roles/roles.repository';
import { Sprints } from '@prisma/postgres/client';
import { Public } from 'src/decorators/is-public.decorator';
import { CreateSprintDto } from './dto/create-sprint.dto';

@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  async create(@User() userLogin: IUserLogin): Promise<{ sprint: Sprints }> {
    return { sprint: await this.sprintsService.create(userLogin) };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
    @User() userLogin: IUserLogin,
  ): Promise<Sprints> {
    return await this.sprintsService.update(id, updateSprintDto, userLogin);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Sprints> {
    return await this.sprintsService.findById(id);
  }

  @Get()
  async findMany(@User() userLogin: IUserLogin): Promise<Sprints[]> {
    return await this.sprintsService.find(userLogin);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() userLogin: IUserLogin) {
    return await this.sprintsService.remove(id, userLogin);
  }
}
