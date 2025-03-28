import {PrismaClient} from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

function randomNumber(length: number) {
  return Math.floor(Math.random() * length);
}

function readJSON() {
  const records: Record[] = JSON.parse(fs.readFileSync('seed/records.json', 'utf8'));
  const educationists: Educationist[] =
      JSON.parse(fs.readFileSync('seed/educationists.json', 'utf8'));
  const therapists: Therapist[] =
      JSON.parse(fs.readFileSync('seed/therapists.json', 'utf8'));
  const children: Child[] = JSON.parse(fs.readFileSync('seed/children.json', 'utf8'));
  // parse birthdates
  children.forEach((child: Child) => {
    if (!child.birthDate) {
      return;
    }
    child.birthDate = new Date(child.birthDate);
  });

  return {records, educationists, therapists, children};
}

export interface Record {
  id: number;
  childId: number;
  authorId: number;
  authorName: string;
  authorRole: string;
  content: string;
  symptoms?: string[];
}

export interface Child {
  id: number;
  name: string;
  parentName: string;
  email: string;
  class: string;
  birthDate: Date;
  supportLevel?: number | null;
  token?: string;
  createdAt?: Date;
  educationists?: number[];
  therapists?: number[];
}

export interface Educationist {
  id: number;
  name: string;
  email: string;
  specialization?: string | null;
  children?: number[];
  createdAt?: Date;
  token?: string;
}

export interface Therapist {
  id: number;
  name: string;
  email: string;
  specialization?: string | null;
  licenseNumber: string;
  children?: number[];
  createdAt?: Date;
  token?: string;
}


async function createChildRelations(child: Child) {
  try {
    if (!child.educationists || !child.therapists) {
      throw new Error('Child must have educationists and therapists');
    }
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

function getIDbyAuthorName(name: string, role: string, children: Child[], educationists: Educationist[], therapists: Therapist[]) {
  if (role === 'Child') { 
    return children.find(child => child.parentName === name)?.id;
  }
  if (role === 'Educationist') {
    return educationists.find(educationist => educationist.name === name)?.id;
  }
  if (role === 'Therapist') {
    return therapists.find(therapist => therapist.name === name)?.id;
  }
}


async function main() {
  var {
    records: recordsJSON, 
    educationists: educationistsJSON, 
    therapists: therapistsJSON, 
    children: childrenJSON
  } = readJSON();

  for (const educationist of educationistsJSON) {
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
        name: educationist.name,
        email: educationist.email,
        specialization: educationist.specialization
      },
    });
  }

  //update
  var educationists: Educationist[] = await prisma.educationist.findMany()
  for (var i = 0; i < educationists.length; i++) {
    educationists[i].children = educationistsJSON[i].children;
    if (educationists[i].email !== educationists[i].email) {
        throw new Error(`Educationist Email ${educationists[i].email} is different`);
    }
  }

  for (const therapist of therapistsJSON) {
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
        name: therapist.name,
        email: therapist.email,
        specialization: therapist.specialization,
        licenseNumber: therapist.licenseNumber
      },
    });
  }

  // update
  var therapists: Therapist[] = await prisma.therapist.findMany()
  for (var i = 0; i < therapists.length; i++) {
    therapists[i].children = therapistsJSON[i].children;
    if (therapists[i].email !== therapists[i].email) {
        throw new Error(`Therapist Email ${therapists[i].email} is different`);
    }
  }

  for (const child of childrenJSON) {
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

  // update
  var children: Child[] = await prisma.child.findMany()
  for (var i = 0; i < children.length; i++) {
    children[i].educationists = childrenJSON[i].educationists;
    children[i].therapists = childrenJSON[i].therapists;
    if (children[i].email !== children[i].email) {
        throw new Error(`Child Email ${children[i].email} is different`);
    }
  }

  for (const child of children) {
    await createChildRelations(child);
  }

  for (const record of recordsJSON) {
    const authorID = getIDbyAuthorName(record.authorName, record.authorRole, children, educationists, therapists);
    if (!authorID) {
      console.error(`Author not found: ${record.authorName}`);
      continue;
    }
    var existingRecord = await prisma.record.findFirst({
      where: {
        childId: record.childId,
        authorId: authorID,
        authorRole: record.authorRole,
        authorName: record.authorName,
        content: record.content
      },
    });
    if (!existingRecord) {
      existingRecord = await prisma.record.create({
        data: {
          childId: record.childId,
          authorId: authorID,
          authorRole: record.authorRole,
          authorName: record.authorName,
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
