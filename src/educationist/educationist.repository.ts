import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class EducationistRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getEducationist(childId: number, filter: string): Promise<any> {
   try {
     return await this.prisma.educationist.findMany({
       where: {
        children: {
           some: {
            childId: childId,
           },
         },
         specialization: filter
       },
       select: {
        id: true,
        name: true,
        specialization: true,
        token: true,
        email: true,
      },
     });
   } catch (e) {
     console.error(Errors.GET_CHILDREN_BY_EDUCATIONIST, e);
     throw new Error(Errors.GET_CHILDREN_BY_EDUCATIONIST);
   }
 }

}

export default EducationistRoutesRepository;
