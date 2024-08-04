import { Injectable } from '@nestjs/common';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { PostgresPrismaService } from 'src/database/postgres-prisma.service';

@Injectable()
export class RolesRepository {
  constructor(private PostgresPrismaService: PostgresPrismaService) {}

  async validateRole(
    projectId: string,
    permissionId: string,
    userLogin: IUserLogin,
  ): Promise<boolean> {
    const member = await this.PostgresPrismaService.members.findFirst({
      where: { projectId, userId: userLogin.id },
      include: { Role: true },
    });
    if (!member || !member.Role.permissionIds.includes(permissionId))
      return false;
    return true;
  }
}
