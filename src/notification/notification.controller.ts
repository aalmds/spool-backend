import { FailureResult, Result, SuccessResult } from "../common/results";
import NotificationService from "./notification.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class NotificationController {
   public router;
   private notificationService: NotificationService;

   constructor(router: Router, notificationService: NotificationService) {
      this.router = router;
      this.notificationService = notificationService;
      this.initRoutes();
   }

   async saveDeviceToken(req: Request, res: Response) {
      try {
         const { userId, deviceToken, userRole } = req.body;
         await this.notificationService.saveDeviceToken(userId, deviceToken, userRole);
         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
         }).handle(res);
      } catch (error) {
         new FailureResult({
            msg: Errors.SAVE_DEVICE_TOKEN,
         }).handle(res);
      }
   }

   public initRoutes() {
      this.router.post('/notification/device-token', async (req, res) => this.saveDeviceToken(req, res));
   }

}

export default NotificationController;