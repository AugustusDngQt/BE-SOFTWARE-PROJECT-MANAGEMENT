import { PrismaClient as PostgresPrismaClient } from '@prisma/postgres/client';

const prisma = new PostgresPrismaClient();

function clear() {
  try {
    console.log('Clearing collections...');
    prisma.comments.deleteMany({});
    prisma.members.deleteMany({});
    prisma.issues.deleteMany({});
    prisma.sprints.deleteMany({});
    prisma.rolePermissions.deleteMany({});
    prisma.permissions.deleteMany({});
    prisma.roles.deleteMany({});
    prisma.users.deleteMany({});
    console.log('Collections cleared');
  } catch (error) {
    console.error('Error clearing collections:', error);
    throw error; // Ensure errors in clear are propagated
  }
}

function seed() {
  try {
    console.log('Inserting seed data...');
    prisma.users.createMany({
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

    prisma.projects.createMany({
      data: [
        {
          id: '7763850a-d874-414b-a824-436c5d23f786',
          name: 'Software project management',
          description: null,
          category: 'Software',
          createdAt: new Date('2024-07-30T17:48:16.577Z'),
          updatedAt: new Date('2024-07-30T17:48:16.577Z'),
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

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
    throw error; // Ensure errors in seed are propagated
  }
}

function main() {
  try {
    clear(); // Ensure `clear` completes before seeding
    seed(); // Seed data only after clearing
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    prisma.$disconnect(); // Ensure Prisma is disconnected in all cases
  }
}

main();
