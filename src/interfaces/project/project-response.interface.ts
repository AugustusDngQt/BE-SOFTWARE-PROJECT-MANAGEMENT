import { IMemberResponse } from '../member/member.interface';
import { IConversationResponse } from '../conversation/conversation-response.interface';
import type { Members, Sprints } from '@prisma/client';
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
  conversation: IConversationResponse;
}
