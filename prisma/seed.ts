import {PrismaClient} from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

function randomNumber(length: number) {
  return Math.floor(Math.random() * length);
}

function readJSON() {
  const records = JSON.parse(fs.readFileSync('./seed/records.json', 'utf8'));
  const educationists =
      JSON.parse(fs.readFileSync('./seed/educationists.json', 'utf8'));
  const therapists =
      JSON.parse(fs.readFileSync('./seed/therapists.json', 'utf8'));
  const children = JSON.parse(fs.readFileSync('./seed/children.json', 'utf8'));
  return {records, educationists, therapists, children};
}

interface Child {
  id: number;
  name: string;
  parentName: string;
  email: string;
  class: string;
  birthDate: string;
  supportLevel: number;
  token: string;
  educationists: number[];
  therapists: number[];
}

async function createChildRelations(child: Child) {
  try {
    for (const educationistId of child.educationists) {
      // if already exists, skip
      const existingChildEducationist =
          await prisma.childEducationist.findFirst({
            where: {childId: child.id, educationistId: educationistId},
          });
      if (existingChildEducationist) {
        console.log(`ChildEducationist already exists: ${
            existingChildEducationist.childId}, ${
            existingChildEducationist.educationistId}`);
        continue;
      }

      await prisma.childEducationist.create({
        data: {
          childId: child.id,
          educationistId: educationistId,
        },
      });
    }

    for (const therapistId of child.therapists) {
      // if already exists, skip
      const existingChildTherapist = await prisma.childTherapist.findFirst({
        where: {childId: child.id, therapistId: therapistId},
      });
      if (existingChildTherapist) {
        console.log(`ChildTherapist already exists: ${
            existingChildTherapist.childId}, ${
            existingChildTherapist.therapistId}`);
        continue;
      }
      await prisma.childTherapist.create({
        data: {
          childId: child.id,
          therapistId: therapistId,
        },
      });
    }
  } catch (error) {
    console.error('Error when creating child and relations:', error);
    throw error;
  }
}


async function main() {
  const {records, educationists, therapists, children} = readJSON();

  for (const educationist of educationists) {
    // if already exists, skip
    const existingEducationist = await prisma.educationist.findFirst({
      where: {email: educationist.email},
    });
    if (existingEducationist) {
      console.log(`Educationist already exists: ${existingEducationist.id}`);
      continue;
    }

    await prisma.educationist.create({
      data: {
        id: educationist.id,
        name: educationist.name,
        email: educationist.email,
        specialization: educationist.specialization
      },
    });
  }

  for (const therapist of therapists) {
    // if already exists, skip
    const existingTherapist = await prisma.therapist.findFirst({
      where: {email: therapist.email},
    });
    if (existingTherapist) {
      console.log(`Therapist already exists: ${existingTherapist.id}`);
      continue;
    }

    await prisma.therapist.create({
      data: {
        id: therapist.id,
        name: therapist.name,
        email: therapist.email,
        specialization: therapist.specialization,
        licenseNumber: therapist.licenseNumber
      },
    });
  }

  for (const child of children) {
    // if already exists, skip
    const existingChild = await prisma.child.findFirst({
      where: {email: child.email},
    });
    if (existingChild) {
      console.log(`Child already exists: ${existingChild.id}`);
      continue;
    }

    await prisma.child.create({
      data: {
        id: child.id,
        name: child.name,
        parentName: child.parentName,
        email: child.email,
        class: child.class,
        birthDate: child.birthDate,
        supportLevel: child.supportLevel,
        token: child.token
      },
    });
  }

  for (const child of children) {
    await createChildRelations(child);
  }

  for (const record of records) {
    var existingRecord = await prisma.record.findFirst({
      where: {
        id: record.id,
      },
    });
    if (!existingRecord) {
      existingRecord = await prisma.record.create({
        data: {
          id: record.id,
          childId: record.childId,
          authorId: record.authorId,
          authorRole: record.authorRole,
          content: record.content,
          symptoms: record.symptoms,
        },
      });
      await prisma.recordRead.create({
        data: {
          recordId: existingRecord.id,
          userId: existingRecord.authorId,
          userRole: existingRecord.authorRole,
          readAt: new Date(),
        },
      });
    } else {
      console.log(`Record already exists: ${existingRecord.id}`);
    }

    const chance = Math.random();
    if (chance < 0.4) {
      var possibleReaderRole = ['Child', 'Educationist', 'Therapist'];
      // remove the author from the possible readers
      possibleReaderRole =
          possibleReaderRole.filter(role => role !== record.authorRole);
      // get child educationists and therapists
      const childEducationists = await prisma.childEducationist.findMany(
          {where: {childId: record.childId}});
      const childTherapists = await prisma.childTherapist.findMany(
          {where: {childId: record.childId}});

      const rand = randomNumber(possibleReaderRole.length);
      var userRole = possibleReaderRole[rand];
      var userId = record.childId;
      if (userRole === 'Educationist') {
        const index = randomNumber(childEducationists.length);
        userId = childEducationists[index].educationistId;
      } else if (userRole === 'Therapist') {
        const index = randomNumber(childTherapists.length);
        userId = childTherapists[index].therapistId;
      }
      var existingRecordRead = await prisma.recordRead.findFirst({
        where:
            {recordId: existingRecord.id, userId: userId, userRole: userRole},
      });
      if (existingRecordRead) {
        console.log(
            `RecordRead already exists: ${existingRecordRead.recordId}, ${
                existingRecordRead.userId}, ${existingRecordRead.userRole}`);
        continue
      }
      await prisma.recordRead.create({
        data: {
          recordId: existingRecord.id,
          userId: userId,
          userRole: userRole,
          readAt: new Date()
        },
      });
    }
  }

  console.log('Data seeded successfully!');
}

main().catch(e => {throw e}).finally(async () => {
  await prisma.$disconnect();
});
