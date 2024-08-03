import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PostgresPrismaService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
