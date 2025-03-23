import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';
import { Roles } from '../common/roles';

class NotificationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

   public updateUser(role: string, data: any): Promise<any> {
      switch (role) {
         case Roles.Educationist:
            return this.prisma.educationist.update(data);
         case Roles.Therapist:
            return this.prisma.therapist.update(data);
         default:
            return this.prisma.child.update(data);
      }
   }

   public async saveDeviceToken(userId: number, deviceToken: string, userRole: string) {
      try {
         await this.updateUser(userRole, {
            where: {
               id: userId
            },
            data: {
               deviceTokens: {
                  push: deviceToken
               }
            }
         });
      } catch (e) {
         throw new Error(Errors.SAVE_DEVICE_TOKEN);
      }
   }
}

export default NotificationRepository;
