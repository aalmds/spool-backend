import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';
import { Roles } from '../common/roles';
import { User } from '../common/user';

class NotificationRepository {
  private prisma: PrismaClient;

   constructor() {
      this.prisma = new PrismaClient();
   }

   public async getUsersToBroadcastNotification(childId: number, authorId: number, authorRole: string): Promise<{
      users: User[],
      authorName: string,
      childName: string
   }> {
      // get all users that will receive the notification
      // based on the child that got a record added
      const child = await this.prisma.child.findUnique({
         where: {
            id: childId
         },
         include: {
            educationists: true,
            therapists: true
         }
      });
      if (!child) {
         throw new Error(Errors.SEND_NOTIFICATION);
      }
      
      const educationistsIds = child.educationists.map((e: any) => e.educationistId);
      const therapistsIds = child.therapists.map((t: any) => t.therapistId);

      const educationists = await this.prisma.educationist.findMany({
         where: {
            id: {
               in: educationistsIds || []
            }  
         }
      });

      const therapists = await this.prisma.therapist.findMany({
         where: {
            id: {
               in: therapistsIds || []
            }
         }
      }); 

      const author = await this.getUser(authorRole, {
         where: {
            id: authorId
         }
      });

      if (!author) {
         throw new Error(Errors.SEND_NOTIFICATION);
      }

      return {
         users: [
            {
               name: child.name,
               token: child.token,
               deviceTokens: child.deviceTokens
            } as User,
            ...educationists.map((educationist: any) => {
               return {
                  name: educationist.name,
                  token: educationist.token,
                  deviceTokens: educationist.deviceTokens
               } as User;
            }),
            ...therapists.map((therapist: any) => {
               return {
                  name: therapist.name,
                  token: therapist.token,
                  deviceTokens: therapist.deviceTokens
               } as User;
            }),
         ] as User[],
         authorName: author.name,
         childName: child.name
      }
   }

   public getUser(role: string, data: any): Promise<any> {
      switch (role) {
         case Roles.Educationist:
            return this.prisma.educationist.findUnique(data);
         case Roles.Therapist:
            return this.prisma.therapist.findUnique(data);
         default:
            return this.prisma.child.findUnique(data);
      }
   }

   public async getUserInfo(userRole: string, userId: number): Promise<any> {
      try {
         return await this.getUser(userRole, {
            where: {
               id: userId
            }
         });
      } catch (e) {
         throw new Error(Errors.GET_USER_INFO);
      }
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
         const user = await this.getUserInfo(userRole, userId);
         const deviceTokens = user.deviceTokens || [];
         if (deviceTokens.includes(deviceToken)) {
            console.log('Device token already exists');
            return;
         }  
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
