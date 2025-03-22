import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';

class EducationistRoutesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async getChildren(educationistId: number): Promise<any> {
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
         name: true
      },
     });
   } catch (e) {
     console.error(Errors.GET_CHILDREN_BY_EDUCATIONIST, e);
     throw new Error(Errors.GET_CHILDREN_BY_EDUCATIONIST);
   }
 }

}

export default EducationistRoutesRepository;
