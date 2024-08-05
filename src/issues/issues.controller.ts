// issues.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { Issues, Users } from '@prisma/client';
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  async create(
    @Body() createIssueDto: CreateIssueDto,
    @User() user: IUserLogin,
  ) {
    return this.issuesService.create(createIssueDto, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
    @User() user: IUserLogin,
  ) {
    return {
      issue: await this.issuesService.update(id, updateIssueDto, user),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.issuesService.findById(id);
  }

  @Get()
  async find(
    @User() user: IUserLogin,
  ): Promise<{ issues: Issues[] | (Issues & { assignee: Users })[] }> {
    return { issues: await this.issuesService.find(user) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUserLogin) {
    return this.issuesService.remove(id, user);
  }
}
