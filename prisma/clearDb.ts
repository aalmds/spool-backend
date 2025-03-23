import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // delete all data from the tables
  await prisma.recordRead.deleteMany();
  await prisma.record.deleteMany();
  await prisma.childEducationist.deleteMany();
  await prisma.childTherapist.deleteMany();
  await prisma.educationist.deleteMany();
  await prisma.therapist.deleteMany();
  await prisma.child.deleteMany();
}

main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
