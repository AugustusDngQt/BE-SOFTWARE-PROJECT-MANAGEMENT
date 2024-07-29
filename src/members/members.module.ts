import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
  exports: [MembersService],
})
export class MembersModule {}
