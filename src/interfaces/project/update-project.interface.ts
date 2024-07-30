import { ETypeUpdateMember } from 'src/enum/project.enum';
import { IProjectResponse } from './project-response.interface';
import { IMemberResponse } from '../member/member.interface';

export interface IUpdateMembers {
  id?: string;
  idUser?: string;
  type: ETypeUpdateMember;
}

export interface IUpdateProjectFunctionResponse {
  project: IProjectResponse;
  members: IMemberResponse[];
}
