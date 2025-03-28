import ReadRecordService from '../read-record/read-record.service';
import RecordService from '../record/record.service';
import ReadRecordController from '../read-record/read-record.controller';
import RecordController from '../record/record.controller';
import NotificationService from '../notification/notification.service';
import NotificationController from '../notification/notification.controller';

import { Router } from 'express';
import { injector } from '.';
import UserController from '../user/user.controller';
import UserService from '../user/user.service';

export function initStatusRoutes(router: Router) {
   const controller = new ReadRecordController(router, injector.getService(ReadRecordService));
   controller.initRoutes();
}
export function initRecordRoutes(router: Router) {
   const controller = new RecordController(router, injector.getService(RecordService), injector.getService(NotificationService));
   controller.initRoutes();
}
export function initNotificationRoutes(router: Router) {
   const controller = new NotificationController(router, injector.getService(NotificationService));
   controller.initRoutes();
}
export function initUserRoute(router: Router) {
   const controller = new UserController(router, injector.getService(UserService));
   controller.initRoutes();
}
