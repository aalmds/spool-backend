import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class ChildRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getChildEducationist(childId: number, filter: string): Promise<any> {
   try {
     return await this.prisma.educationist.findMany({
       where: {
         children: {
           some: {
            childId: childId,
           },
         },
         specialization: filter,
       },
       select: {
         name: true,    
         specialization: true,
      },
     });
   } catch (e) {
     console.error(Errors.GET_EDUCATIONISTS_BY_CHILD_ID, e);
     throw new Error(Errors.GET_EDUCATIONISTS_BY_CHILD_ID);
   }
 }

 public async getChildTherapist(childId: number): Promise<any> {
   try {
     return await this.prisma.therapist.findMany({
       where: {
         children: {
           some: {
            childId: childId,
           },
         },
       },
       select: {
         name: true,    
         licenseNumber: true,
      },
     });
   } catch (e) {
     console.error(Errors.GET_THERAPISTS_BY_CHILD_ID, e);
     throw new Error(Errors.GET_THERAPISTS_BY_CHILD_ID);
   }
 }

}

export default ChildRoutesRepository;
