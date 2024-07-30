import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { UsersModule } from 'src/users/users.module';
import { MongoPrismaService } from 'src/database/mongo-prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, MongoPrismaService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
