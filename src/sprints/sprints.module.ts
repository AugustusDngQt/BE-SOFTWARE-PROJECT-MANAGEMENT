import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { PostgresPrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SprintsController],
  providers: [SprintsService, PostgresPrismaService, UsersService],
  exports: [SprintsService],
})
export class SprintsModule {}
