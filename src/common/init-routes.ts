import ReadRecordService from '../read-record/read-record.service';
import RecordService from '../record/record.service';
import ReadRecordController from '../read-record/read-record.controller';
import RecordController from '../record/record.controller';
import { Router } from 'express';
import { injector } from '.';

export function initStatusRoutes(router: Router) {
   const controller = new ReadRecordController(router, injector.getService(ReadRecordService));
   controller.initRoutes();
}
export function initRecordRoutes(router: Router) {
   const controller = new RecordController(router, injector.getService(RecordService));
   controller.initRoutes();
}