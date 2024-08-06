import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongoPrismaService } from 'src/database/mongo-prisma.service';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, MongoPrismaService],
  exports: [MessagesService],
})
export class MessagesModule {}
