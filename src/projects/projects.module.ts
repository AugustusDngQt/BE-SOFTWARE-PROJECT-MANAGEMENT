import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { MembersModule } from 'src/members/members.module';
import { UsersModule } from 'src/users/users.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { SprintsModule } from 'src/sprints/sprints.module';

@Module({
  imports: [
    ConversationsModule,
    MembersModule,
    UsersModule,
    forwardRef(() => SprintsModule),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, PostgresPrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
