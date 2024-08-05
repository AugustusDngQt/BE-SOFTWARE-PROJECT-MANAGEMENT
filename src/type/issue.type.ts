import { Issues } from '@prisma/client';

export type GetIssuesResponse = {
  issues: Issues[];
};
export type IssueType = GetIssuesResponse['issues'][number];
