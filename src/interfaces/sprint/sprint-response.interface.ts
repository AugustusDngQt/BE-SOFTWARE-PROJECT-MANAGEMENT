import type { Sprints, Users } from '@prisma/client';

export interface ISprintResponse {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  projectId: string;
  assigneeId?: string;
  Assignee?: Users;
  issues?: Sprints[];
}
