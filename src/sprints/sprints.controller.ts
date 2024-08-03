import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SprintsService } from './sprints.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { ISprintResponse } from 'src/interfaces/sprint/sprint-response.interface';
import { User } from 'src/decorators/user.decorator';
import { FindSprintByProjectIdStatusDto } from './dto/find-sprints-by-projectid-&-status.dto';

@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post()
  async create(
    @Body() createSprintDto: CreateSprintDto,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    return this.sprintsService.create(createSprintDto, userLogin);
  }

  @Patch()
  async update(
    @Body() updateSprintDto: UpdateSprintDto,
    @User() userLogin: IUserLogin,
  ): Promise<ISprintResponse> {
    return await this.sprintsService.update(updateSprintDto, userLogin);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    return await this.sprintsService.restore(id);
  }

  @Get('find-one-by-id/:id')
  async findById(@Param('id') id: string): Promise<ISprintResponse> {
    return await this.sprintsService.findById(id);
  }

  @Get()
  async findMany(
    @Query() query: FindSprintByProjectIdStatusDto,
  ): Promise<ISprintResponse[]> {
    return await this.sprintsService.find(query);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() userLogin: IUserLogin) {
    return await this.sprintsService.remove(id, userLogin);
  }
}
