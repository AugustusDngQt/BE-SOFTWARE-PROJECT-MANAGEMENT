import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './interceptors/error-handling.interceptor';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
