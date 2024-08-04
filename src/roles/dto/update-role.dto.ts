export class UpdateRoleDto {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  permissionIds?: string[];
}
