import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PostgresPrismaService],
  exports: [UsersService],
})
export class UsersModule {}
