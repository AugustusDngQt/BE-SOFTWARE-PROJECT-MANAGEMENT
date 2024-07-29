import { Members, Sprints } from '@prisma/client';
import { Conversation } from 'mongodb/schemas/Conversation.schema';
import { IMemberResponse } from '../member/member.interface';

export interface IProjectResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  Sprints?: Sprints[];
  Members?: Members[];
}

export interface ICreateProjectFunctionResponse {
  project: IProjectResponse;
  members: IMemberResponse[];
  conversation: Conversation;
}
