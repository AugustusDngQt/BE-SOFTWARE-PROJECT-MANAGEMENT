import { Global, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';
import { RolesRepository } from './roles.repository';

@Global()
@Module({
  imports: [PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService, PostgresPrismaService, RolesRepository],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
