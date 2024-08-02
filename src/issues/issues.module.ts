// issues.module.ts
import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { PostgresPrismaService } from 'src/prisma.service';
import { SprintsModule } from 'src/sprints/sprints.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [SprintsModule, ProjectsModule],
  controllers: [IssuesController],
  providers: [IssuesService, PostgresPrismaService],
})
export class IssuesModule {}
