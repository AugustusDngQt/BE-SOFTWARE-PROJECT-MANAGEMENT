// issues.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { User } from 'src/decorators/user.decorator';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { FindIssuesByInformationDto } from './dto/find-issues-by-information.dto';

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

  @Patch()
  async update(
    @Body() updateIssueDto: UpdateIssueDto,
    @User() user: IUserLogin,
  ) {
    return this.issuesService.update(updateIssueDto, user);
  }

  @Post('restore/:id')
  async restore(@Param('id') id: string) {
    return this.issuesService.restore(id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.issuesService.findById(id);
  }

  @Get()
  async find(@Query() query: FindIssuesByInformationDto) {
    return this.issuesService.find(query);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUserLogin) {
    return this.issuesService.remove(id, user);
  }
}
