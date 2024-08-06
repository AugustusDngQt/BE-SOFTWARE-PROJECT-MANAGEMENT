import { PrismaClient as PostgresPrismaClient } from '@prisma/postgres/client';
import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';
import {
  conversationData,
  defaultUsers,
  issueData,
  memberData,
  messageData,
  projectData,
  sprintData,
} from './seed-data';

const postgresPrisma = new PostgresPrismaClient();
const mongoPrisma = new MongoPrismaClient();

(async function () {
  try {
    await mongoPrisma.conversations.deleteMany({});
    await mongoPrisma.messages.deleteMany({});

    console.log('Inserting seed data...');
    await postgresPrisma.users.createMany({
      data: defaultUsers,
    });

    await postgresPrisma.projects.createMany({
      data: projectData,
    });

    memberData.map(async (item) => {
      const { projectId, ...payload } = item;
      await postgresPrisma.members.create({
        data: {
          ...payload,
          project: { connect: { id: projectId } },
        },
      });
    });

    await mongoPrisma.conversations.createMany({
      data: conversationData,
    });

    await postgresPrisma.sprints.createMany({
      data: sprintData,
    });

    issueData.map(async (item) => {
      const { sprintId, ...payload } = item;
      await postgresPrisma.issues.create({
        data: {
          ...payload,
          Sprint: sprintId ? { connect: { id: sprintId } } : undefined,
        },
      });
    });

    await mongoPrisma.messages.createMany({
      data: messageData,
    });

    // await postgresPrisma.permissions.createMany({
    //   data: permissionData,
    // });

    // await postgresPrisma.roles.createMany({
    //   data: roleData,
    // });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    postgresPrisma.$disconnect();
    mongoPrisma.$disconnect();
  }
})();
