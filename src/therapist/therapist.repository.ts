import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class TherapistRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getChildren(therapistId: number): Promise<any> {
   try {
     return await this.prisma.child.findMany({
       where: {
        therapists: {
           some: {
            therapistId: therapistId,
           },
         },
       },
       select: {
         name: true
      },
     });
   } catch (e) {
     console.error(Errors.GET_CHILDREN_BY_THERAPIST, e);
     throw new Error(Errors.GET_CHILDREN_BY_THERAPIST);
   }
 }

 public async sendToken(therapistId: number): Promise<any> {
  const id = therapistId
}

}

export default TherapistRoutesRepository;
