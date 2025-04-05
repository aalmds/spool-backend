import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class TherapistRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getTherapist(ChildId: number): Promise<any> {
   try {
     return await this.prisma.therapist.findMany({
       where: {
        children: {
           some: {
            childId: ChildId,
           },
         },
       },
       select: {
        id: true,
        name: true,
        specialization: true,
        token: true,
        email: true,
        licenseNumber: true
      },
     });
   } catch (e) {
     console.error(Errors.GET_CHILDREN_BY_THERAPIST, e);
     throw new Error(Errors.GET_CHILDREN_BY_THERAPIST);
   }
 }

  public async createTherapist(name: string, email: string, licenseNumber: string, specialization: string) {
    try {
      return await this.prisma.therapist.create({
          data: {
            name: name,
            specialization: specialization,
            email: email,
            licenseNumber: licenseNumber
          },
      });
    } catch (e) {
      console.error(Errors.CREATE_THERAPIST, e);
      throw new Error(Errors.CREATE_THERAPIST);
    }

  }

  public async createChildTherapist(childId: number, therapistId: number): Promise<any> {
    try {
      await this.prisma.childTherapist.create({
        data: {
          childId: childId,
          therapistId: therapistId
        }
      });
    } catch (e) {
      console.error(Errors.CREATE_CHILD_THERAPIST, e);
      throw new Error(Errors.CREATE_CHILD_THERAPIST);
    }
  }
}
export default TherapistRoutesRepository;
