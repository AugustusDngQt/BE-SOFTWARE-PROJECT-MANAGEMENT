// issues.module.ts
import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { PostgresPrismaService } from 'src/prisma.service';

@Module({
  controllers: [IssuesController],
  providers: [IssuesService, PostgresPrismaService],
})
export class IssuesModule {}
