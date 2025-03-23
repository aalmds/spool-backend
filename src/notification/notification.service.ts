import NotificationRepository from "./notification.repository";
import { Errors } from "../common/errors";
import Env from "../env";
import { Novu } from '@novu/api';
import axios from 'axios';

class NotificationService {
   private notificationRepository: NotificationRepository;
   private novu = new Novu({ 
     secretKey: Env['NOVU_SECRET_KEY']
   });

   constructor(notificationRepository: NotificationRepository) {
      this.notificationRepository = notificationRepository;
   }

   saveDeviceToken(userId: number, deviceToken: string, userRole: string) {
      return this.notificationRepository.saveDeviceToken(userId, deviceToken, userRole);
   }

   async sendPushNotification(deviceToken: string, message: string) {
     try {
         const res = await axios.post('https://exp.host/--/api/v2/push/send', {
            to: deviceToken,
            sound: 'default',
            title: 'Novo Registro!',
            body: message
         });
     } catch (error: any) {
       console.error(Errors.SEND_NOTIFICATION, error.response?.data || error.message);
     }
   }
   
   async sendNotification(userToken: string, deviceToken: string, message: string) {
      try {
       await this.sendPushNotification(deviceToken, message);
     } catch (error) {
       console.error(Errors.SEND_NOTIFICATION, error);
     }
   }

   async broadcastNotification(childId: number, authorId: number, authorRole: string) {
      try {
         const { users, authorName, childName } = await this.notificationRepository.getUsersToBroadcastNotification(childId, authorId, authorRole);
         const message = `${authorName} adicionou um registro sobre ${childName}!`;
         for (const { token, deviceTokens, name } of users) {
            for (const deviceToken of deviceTokens) {
               await this.sendNotification(token, deviceToken, message);
            }
         }
      } catch (error) {
         console.error(Errors.SEND_NOTIFICATION, error);
      }
   }
}

export default NotificationService;