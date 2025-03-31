import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class ReadRecordRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async readRecord(
    recordId: number,
    userId: number,
    userRole: string,
    readAt?: Date
  ): Promise<void> {
    try {
      await this.prisma.recordRead.create({
        data: {
          recordId,
          userId,
          userRole,
          readAt: readAt ?? new Date(),
        },
      });
    } catch (e) {
      console.error(Errors.READ_RECORD, e);
      throw new Error(Errors.READ_RECORD);
    }
  }

   public async getReadRecord(recordId: number): Promise<any> {
      try {
         return await this.prisma.recordRead.findMany({
            where: {
               recordId,
            },
         });
      } catch (e) {
         console.error(Errors.GET_READ_RECORD, e);
         throw new Error(Errors.GET_READ_RECORD);
      }
   }
}

export default ReadRecordRepository;
