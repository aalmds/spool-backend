import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class RecordRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getRecordsByChild(childId: number, limit: number, page: number, role?: string): Promise<any[]> {
    try {
      return await this.prisma.record.findMany({
        where: { 
          childId,
          ...(role && { authorRole: { equals: role, mode: "insensitive" } }),
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error(Errors.GET_RECORDS, e);
      throw new Error(Errors.GET_RECORDS);
    }
  }

  public async getRecordsByChildAndTherapist(childId: number, therapistId: number, limit: number, page: number): Promise<any[]> {
    try {
      return await this.prisma.record.findMany({
        where: {
          childId,
          child: { therapists: { some: { therapistId } } },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error(Errors.GET_RECORDS, e);
      throw new Error(Errors.GET_RECORDS);
    }
  }

  public async getRecordsByChildAndEducationist(childId: number, educationistId: number, limit: number, page: number): Promise<any[]> {
    try {
      return await this.prisma.record.findMany({
        where: {
          childId,
          child: { educationists: { some: { educationistId } } },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error(Errors.GET_RECORDS, e);
      throw new Error(Errors.GET_RECORDS);
    }
  }

  public async getRecordsByTherapist(therapistId: number, limit: number, page: number, status?: boolean): Promise<any[]> {
    try {
      return await this.prisma.record.findMany({
        where: {
          child: { therapists: { some: { therapistId } } },
          ...(status === false && {
            reads: { none: { 
              userId: therapistId, 
              userRole: { contains: 'Therapist', mode: 'insensitive' }
            }}
          })
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error(Errors.GET_RECORDS, e);
      throw new Error(Errors.GET_RECORDS);
    }
  }

  public async getRecordsByEducationist(educationistId: number, limit: number, page: number, status?: boolean, ): Promise<any[]> {
    try {
      return await this.prisma.record.findMany({
        where: {
          child: { educationists: { some: { educationistId } } },
          ...(status === false && {
            reads: { none: { 
              userId: educationistId, 
              userRole: { contains: 'Educationist', mode: 'insensitive' }
            }}
          })
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.error(Errors.GET_RECORDS, e);
      throw new Error(Errors.GET_RECORDS);
    }
  }
}

export default RecordRepository;
