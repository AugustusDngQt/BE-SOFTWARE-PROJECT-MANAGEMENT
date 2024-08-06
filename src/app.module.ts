import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { DatabaseModule } from './database/database.module';
import { SprintsModule } from './sprints/sprints.module';
import { IssuesModule } from './issues/issues.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CommentsModule } from './comments/comments.module';
import { ChatGateway } from './chat.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProjectsModule,
    MembersModule,
    DatabaseModule,
    SprintsModule,
    IssuesModule,
    RolesModule,
    PermissionsModule,
    CommentsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, JwtService],
})
export class AppModule {}
