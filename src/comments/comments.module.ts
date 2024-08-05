import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, PostgresPrismaService],
})
export class CommentsModule {}
