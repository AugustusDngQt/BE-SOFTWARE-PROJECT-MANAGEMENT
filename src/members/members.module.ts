import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { UsersModule } from 'src/users/users.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [MembersController],
  providers: [MembersService, PostgresPrismaService],
  exports: [MembersService],
})
export class MembersModule {}
