import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/prisma.service';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { MembersModule } from 'src/members/members.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConversationsModule, MembersModule, UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
