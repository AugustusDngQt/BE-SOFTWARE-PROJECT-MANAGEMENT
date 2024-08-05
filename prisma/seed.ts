import { PrismaClient as PostgresPrismaClient } from '@prisma/postgres/client';
import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';
import { defaultUsers } from './seed-data';

const postgresPrisma = new PostgresPrismaClient();
const mongoPrisma = new MongoPrismaClient();

const memberData = [
  {
    id: '1017150e-c52d-49f6-b281-f30738236670',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
  {
    id: 'e560562a-8de3-4314-ba00-d7ff4e8899ae',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
  {
    id: '61d89532-397e-4e93-95be-66daf58fab30',
    projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
  },
];
const sprintData = [
  {
    id: 'f924fe53-c5f7-429e-b217-2a74e2658264',
    name: 'Sprint 1',
    description: 'Initial sprint for the project 1',
    startDate: '2024-08-04T01:20:44.314Z',
    endDate: '2024-08-14T23:59:59.000Z',
    status: 'Active',
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    assigneeId: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
    createdAt: '2024-08-03T13:47:57.280Z',
    updatedAt: '2024-08-04T01:20:44.320Z',
    deletedAt: null,
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    deletedBy: null,
    isDeleted: false,
  },
];
const issueData = [
  {
    id: '5130f617-2243-46b2-a508-f54832454bb6',
    name: 'Login',
    key: '001',
    type: 'Task',
    status: 'To do',
    priority: '3',
    sprintPosition: null,
    boardPosition: 0,
    reporterId: null,
    assigneeId: null,
    issueParrentId: null,
    sprintId: null,
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    note: null,
    description: 'Users are unable to login due to a server error.',
    startDate: null,
    endDate: '2024-08-30T17:48:16.577Z',
    createdAt: '2024-08-03T13:42:14.685Z',
    updatedAt: '2024-08-03T13:42:14.685Z',
    deletedAt: null,
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: null,
    deletedBy: null,
    isDeleted: false,
  },
  {
    id: '888e70d6-ecd0-4e5d-bd67-af896ed410ca',
    name: 'Register',
    key: '002',
    type: 'Task',
    status: 'To do',
    priority: '1',
    sprintPosition: null,
    boardPosition: 1,
    reporterId: null,
    assigneeId: null,
    issueParrentId: null,
    sprintId: null,
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    note: null,
    description: 'Users register account',
    startDate: null,
    endDate: '2024-08-30T17:48:16.577Z',
    createdAt: '2024-08-03T13:46:32.645Z',
    updatedAt: '2024-08-03T13:46:32.645Z',
    deletedAt: null,
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: null,
    deletedBy: null,
    isDeleted: false,
  },
  {
    id: '990d19d3-a902-4a18-adb7-1b6b71e5ef06',
    name: 'Create User',
    key: '003',
    type: 'Task',
    status: 'To do',
    priority: '1',
    sprintPosition: null,
    boardPosition: 2,
    reporterId: null,
    assigneeId: null,
    issueParrentId: null,
    sprintId: null,
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    note: null,
    description: 'Create new user',
    startDate: null,
    endDate: '2024-08-30T17:48:16.577Z',
    createdAt: '2024-08-03T13:47:14.007Z',
    updatedAt: '2024-08-03T13:47:14.007Z',
    deletedAt: null,
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: null,
    deletedBy: null,
    isDeleted: false,
  },
  {
    id: 'ce61195c-d9d1-434b-a87b-33e0f1ef490c',
    name: 'Update user',
    key: '004',
    type: 'Task',
    status: 'To do',
    priority: '1',
    sprintPosition: 1,
    boardPosition: null,
    reporterId: '4701c89d-9dbb-443f-bba9-5aca27d31c44',
    assigneeId: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
    issueParrentId: null,
    sprintId: 'f924fe53-c5f7-429e-b217-2a74e2658264',
    projectId: null,
    note: 'Update new user',
    description: null,
    startDate: '2024-08-30T17:48:16.577Z',
    endDate: '2024-08-03T13:48:33.410Z',
    createdAt: '2024-08-04T01:48:31.373Z',
    updatedAt: '2024-08-03T13:48:33.410Z',
    deletedAt: '2024-08-04T01:48:31.373Z',
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    deletedBy: null,
    isDeleted: false,
  },
];

(async function () {
  try {
    await mongoPrisma.conversations.deleteMany({});
    await mongoPrisma.messages.deleteMany({});

    console.log('Inserting seed data...');
    await postgresPrisma.users.createMany({
      data: defaultUsers,
    });

    await postgresPrisma.projects.createMany({
      data: [
        {
          id: '61707d2c-91de-4e39-b605-7f4a4a74f039',
          key: 'software-project-management',
          name: 'Software project management',
          defaultAssignee: null,
          imageUrl: null,
          createdAt: '2024-08-04T21:31:18.347Z',
          updatedAt: '2024-08-04T21:31:18.347Z',
          deletedAt: null,
        },
      ],
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
      data: [
        {
          id: '66aff327c6e65a0b06c65cd5',
          title: 'Software project management',
          projectId: '61707d2c-91de-4e39-b605-7f4a4a74f039',
          participants: [
            {
              id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
              name: 'Trần Nguyễn Duy Khánh',
              email: 'duykhanhtran17062003@gmail.com',
            },
            {
              id: '8ac42d37-9161-42d3-8973-5dd153a4ad88',
              name: 'Duy Khánh DTUers',
              email: 'trannduykhanh@dtu.edu.vn',
            },
            {
              id: '5cc9f5c5-3ccd-4620-8f33-272186db91d2',
              name: 'Tran Nguyen Duy Khanh',
              email: 'tnduykhanhdng@gmail.com',
            },
          ],
          createdAt: '2024-08-04T21:31:18.947Z',
          updatedAt: '2024-08-04T21:31:18.947Z',
          createdBy: {
            id: '6bdee06d-dfd5-40b3-a3f9-519f24a610e7',
            name: 'Trần Nguyễn Duy Khánh',
            email: 'duykhanhtran17062003@gmail.com',
          },
          isDeleted: false,
        },
      ],
    });

    // sprintData.map(async (item) => {
    //   const { projectId, assigneeId, ...payload } = item;
    //   await postgresPrisma.sprints.create({
    //     data: {
    //       ...payload,
    //       Project: { connect: { id: projectId } },
    //     },
    //   });
    // });

    // issueData.map(async (item) => {
    //   const { projectId, sprintId, ...payload } = item;
    //   await postgresPrisma.issues.create({
    //     data: {
    //       ...payload,
    //       Sprint: sprintId ? { connect: { id: sprintId } } : undefined,
    //       Project: projectId ? { connect: { id: projectId } } : undefined,
    //     },
    //   });
    // });

    // // await postgresPrisma.permissions.createMany({
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
