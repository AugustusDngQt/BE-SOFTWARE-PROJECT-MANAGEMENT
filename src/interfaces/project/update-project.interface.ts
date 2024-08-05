import { ETypeUpdateMember } from 'src/enum/project.enum';

export interface IUpdateMembers {
  id?: string;
  idUser?: string;
  roleId: string;
  type: ETypeUpdateMember;
}
