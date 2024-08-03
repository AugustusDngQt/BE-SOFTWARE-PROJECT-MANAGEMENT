import { PrismaClient as PostgresPrismaClient } from '@prisma/postgres/client';
import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';

const postgresPrisma = new PostgresPrismaClient();
const mongoPrisma = new MongoPrismaClient();

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

    await postgresPrisma.projects.create({
      data: {
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
    });

    await postgresPrisma.members.createMany({
      data: [
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
      ],
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

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    postgresPrisma.$disconnect();
    mongoPrisma.$disconnect();
  }
})();
