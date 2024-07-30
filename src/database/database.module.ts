import { Module } from '@nestjs/common';
import { PostgresPrismaService } from './postgres-prisma.service';
import { MongoPrismaService } from './mongo-prisma.service';

@Module({
  controllers: [],
  providers: [PostgresPrismaService, MongoPrismaService],
  exports: [PostgresPrismaService, MongoPrismaService],
})
export class DatabaseModule {}
