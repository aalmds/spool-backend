import ReadRecordService from '../read-record/read-record.service';
import ReadRecordController from '../read-record/read-record.controller';
import { Router } from 'express';
import { injector } from '.';

export function initStatusRoutes(router: Router) {
   const controller = new ReadRecordController(router, injector.getService(ReadRecordService));
   controller.initRoutes();
}