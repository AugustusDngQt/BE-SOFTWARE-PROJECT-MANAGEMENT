import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';
import { ObjectId } from 'mongodb';

const prisma = new MongoPrismaClient();

async function clear() {
  console.log('Clearing collections...');
  await prisma.conversations.deleteMany({});
  await prisma.messages.deleteMany({});
  console.log('Collections cleared.');
}

async function seed() {
  console.log('Inserting seed data...');
  await prisma.conversations.create({
    data: {
      id: new ObjectId('66ad321da16e2dbd0b2acb5b').toHexString(),
      title: 'Software project management',
      projectId: '577df6ec-b3bc-4381-925c-1019be3d0461',
      participants: [
        {
          id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
          name: 'Duy Khánh DTU',
          email: 'trannduykhanh@dtu.edu.vn',
        },
        {
          id: '4701c89d-9dbb-443f-bba9-5aca27d31c44',
          name: 'Duy Khánh ',
          email: 'duykhanhtran17062003@gmail.com',
        },
      ],
      createdAt: new Date('2024-08-02T19:23:08.471Z'),
      updatedAt: new Date('2024-08-02T19:23:08.471Z'),
      createdBy: {
        id: '935b8157-0517-4ef1-9c0a-0744cf94af5a',
        name: 'Duy Khánh DTU',
        email: 'trannduykhanh@dtu.edu.vn',
      },
      isDeleted: false,
    },
  });
  console.log('Seed data inserted successfully.');
}

async function main() {
  try {
    await clear();
    await seed();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
