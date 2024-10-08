// issues.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { SprintsModule } from 'src/sprints/sprints.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => SprintsModule), ProjectsModule, UsersModule],
  controllers: [IssuesController],
  providers: [IssuesService, PostgresPrismaService],
  exports: [IssuesService],
})
export class IssuesModule {}
