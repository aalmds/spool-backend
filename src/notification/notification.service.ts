import NotificationRepository from "./notification.repository";
import { Errors } from "../common/errors";

class NotificationService {
   private notificationRepository: NotificationRepository;

   constructor(notificationRepository: NotificationRepository) {
      this.notificationRepository = notificationRepository;
   }

   saveDeviceToken(userId: number, deviceToken: string, userRole: string) {
      return this.notificationRepository.saveDeviceToken(userId, deviceToken, userRole);
   }
}

export default NotificationService;