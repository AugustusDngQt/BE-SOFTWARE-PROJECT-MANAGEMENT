import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { UsersService } from 'src/users/users.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Module({
  imports: [ProjectsModule],
  controllers: [SprintsController],
  providers: [SprintsService, PostgresPrismaService],
  exports: [SprintsService],
})
export class SprintsModule {}
