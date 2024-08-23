import { Issues } from '@prisma/postgres/client';

export type GetIssuesResponse = {
  issues: Issues[];
};
export type IssueType = GetIssuesResponse['issues'][number];
