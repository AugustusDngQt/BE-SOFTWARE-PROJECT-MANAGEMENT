import { PrismaClient as PostgresPrismaClient } from '@prisma/postgres/client';
import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';

const postgresPrisma = new PostgresPrismaClient();
const mongoPrisma = new MongoPrismaClient();

const memberData = [
  {
    id: 'cb9b8759-9209-4c89-b670-38e1d230941e',
    userId: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    createdAt: new Date('2024-08-03T07:54:59.674Z'),
    updatedAt: new Date('2024-08-03T07:54:59.674Z'),
    deletedAt: null,
    isDeleted: false,
    roleId: null,
    status: 'Pending',
    createdBy: {
      id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
      name: 'Duy Khánh DTU',
      email: 'trannduykhanh@dtu.edu.vn',
    },
    updatedBy: null,
    deletedBy: null,
  },
  {
    id: '56219812-805e-439c-ba68-502a64b2e812',
    userId: '4701c89d-9dbb-443f-bba9-5aca27d31c44',
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    createdAt: new Date('2024-08-03T07:54:59.674Z'),
    updatedAt: new Date('2024-08-03T08:01:22.567Z'),
    deletedAt: null,
    isDeleted: false,
    roleId: null,
    status: 'Accepted',
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
  },
];
const sprintData = [
  {
    id: 'f924fe53-c5f7-429e-b217-2a74e2658264',
    name: 'Sprint 1',
    description: 'Initial sprint for the project 1',
    startDate: null,
    endDate: '2024-08-14T23:59:59.000Z',
    status: 'Active',
    projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
    assigneeId: null,
    createdAt: '2024-08-03T13:47:57.280Z',
    updatedAt: '2024-08-03T13:47:57.280Z',
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
    name: 'Update User',
    key: '004',
    type: 'Task',
    status: 'To do',
    priority: '1',
    sprintPosition: 1,
    boardPosition: null,
    reporterId: null,
    assigneeId: null,
    issueParrentId: null,
    sprintId: 'f924fe53-c5f7-429e-b217-2a74e2658264',
    projectId: null,
    note: null,
    description: 'Update new user',
    startDate: null,
    endDate: '2024-08-30T17:48:16.577Z',
    createdAt: '2024-08-03T13:48:33.410Z',
    updatedAt: '2024-08-03T13:48:33.410Z',
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
];
(async function () {
  try {
    await mongoPrisma.conversations.deleteMany({});
    await mongoPrisma.messages.deleteMany({});

    console.log('Inserting seed data...');
    await postgresPrisma.users.createMany({
      data: [
        {
          id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
          email: 'trannduykhanh@dtu.edu.vn',
          name: 'Duy Khánh DTU',
          address: '28 Cổ Mân Cúc 1',
          phoneNumber: '0905081333',
          password:
            '$2b$10$/EPNsLlevL/0RxUoCo/HUumDVdMArqRg0z.Gm79xn98LxNrtgjIEG',
          verifiedToken: null,
          forgotPasswordToken: null,
          refreshToken: null,
          status: 'Unverified',
          createdAt: new Date('2024-07-30T17:46:26.769Z'),
          updatedAt: new Date('2024-07-30T17:46:26.769Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
          isDeleted: false,
        },
        {
          id: '4701c89d-9dbb-443f-bba9-5aca27d31c44',
          email: 'duykhanhtran17062003@gmail.com',
          name: 'Duy Khánh',
          address: '28 Cổ Mân Cúc 1',
          phoneNumber: '0905081330',
          password:
            '$2b$10$sOYhni9UYJLJF3dQxENp1u6hKwbER3yATYZVUEi31N/KUC8.eboSK',
          verifiedToken: null,
          forgotPasswordToken: null,
          refreshToken: null,
          status: 'Unverified',
          createdAt: new Date('2024-07-30T17:48:02.221Z'),
          updatedAt: new Date('2024-07-30T17:48:02.221Z'),
          deletedAt: null,
          createdBy: null,
          updatedBy: null,
          deletedBy: null,
          isDeleted: false,
        },
      ],
    });

    await postgresPrisma.projects.createMany({
      data: [
        {
          id: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
          name: 'Software project management',
          description: null,
          category: 'Software',
          createdAt: new Date('2024-08-03T07:54:59.046Z'),
          updatedAt: new Date('2024-08-03T07:54:59.046Z'),
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
      ],
    });

    memberData.map(async (item) => {
      const { projectId, roleId, userId, ...payload } = item;
      await postgresPrisma.members.create({
        data: {
          ...payload,
          Project: { connect: { id: projectId } },
          User: { connect: { id: userId } },
          Role: roleId ? { connect: { id: roleId } } : undefined,
        },
      });
    });

    await mongoPrisma.conversations.createMany({
      data: [
        {
          id: '66ade2538cf09c201e195db1',
          title: 'Software project management',
          projectId: '86d2c0bf-1e5f-43c2-8cee-0a8dedfc8cff',
          participants: [
            {
              id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
              name: 'Duy Khánh DTU',
              email: 'trannduykhanh@dtu.edu.vn',
            },
            {
              id: '4701c89d-9dbb-443f-bba9-5aca27d31c44',
              name: 'Duy Khánh',
              email: 'duykhanhtran17062003@gmail.com',
            },
          ],
          createdAt: new Date('2024-08-03T07:54:59.057Z'),
          updatedAt: new Date('2024-08-03T07:54:59.057Z'),
          createdBy: {
            id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
            name: 'Duy Khánh DTU',
            email: 'trannduykhanh@dtu.edu.vn',
          },
          isDeleted: false,
        },
      ],
    });

    sprintData.map(async (item) => {
      const { projectId, assigneeId, ...payload } = item;
      await postgresPrisma.sprints.create({
        data: {
          ...payload,
          Project: { connect: { id: projectId } },
        },
      });
    });

    issueData.map(async (item) => {
      const { projectId, sprintId, ...payload } = item;
      await postgresPrisma.issues.create({
        data: {
          ...payload,
          Sprint: sprintId ? { connect: { id: sprintId } } : undefined,
          Project: projectId ? { connect: { id: projectId } } : undefined,
        },
      });
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    postgresPrisma.$disconnect();
    mongoPrisma.$disconnect();
  }
})();
