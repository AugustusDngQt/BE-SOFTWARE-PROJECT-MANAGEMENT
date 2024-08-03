// issues.module.ts
import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { SprintsModule } from 'src/sprints/sprints.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Module({
  imports: [SprintsModule, ProjectsModule],
  controllers: [IssuesController],
  providers: [IssuesService, PostgresPrismaService],
})
export class IssuesModule {}
