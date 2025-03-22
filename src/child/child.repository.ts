import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class ChildRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getChildrenEducationist(educationistId: number): Promise<any> {
   try {
     return await this.prisma.child.findMany({
       where: {
         educationists: {
           some: {
            educationistId: educationistId,
           },
         },
       },
       select: {
         name: true,
      },
     });
   } catch (e) {
     console.error(Errors.GET_EDUCATIONISTS_BY_CHILD_ID, e);
     throw new Error(Errors.GET_EDUCATIONISTS_BY_CHILD_ID);
   }
 }

 public async getChildrenTherapist(therapistId: number): Promise<any> {
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
         name: true,
      },
     });
   } catch (e) {
     console.error(Errors.GET_THERAPISTS_BY_CHILD_ID, e);
     throw new Error(Errors.GET_THERAPISTS_BY_CHILD_ID);
   }
 }

}

export default ChildRoutesRepository;
