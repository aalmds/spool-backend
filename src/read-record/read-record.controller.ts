import { FailureResult, Result, SuccessResult } from "../common/results";
import ReadRecordService from "./read-record.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class ReadRecordController {
    public router;
    private readRecordService: ReadRecordService;

   constructor(router: Router, readRecordService: ReadRecordService) {
      this.router = router;
      this.readRecordService = readRecordService;
      this.initRoutes();
   }

   public async readRecord(req: Request, res: Response): Promise<void> {
      try {
         const { recordId, userId, userRole } = req.body;
         await this.readRecordService.readRecord(recordId, userId, userRole);
         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.READ_RECORD,
         }).handle(res);
      }
   }

   public async getReadRecord(req: Request, res: Response): Promise<void> {
      try {
         const { recordId } = req.params;
         const readRecord = await this.readRecordService.getReadRecord(Number(recordId));
         
         if (!readRecord) {
            new FailureResult({
               msg: Errors.GET_READ_RECORD,
            }).handle(res);
         } else {
            new SuccessResult({
               msg: Result.transformRequestOnMsg(req),
               data: readRecord,
            }).handle(res);
         }
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_READ_RECORD,
         }).handle(res);
      }
   }

   public initRoutes() {
      this.router.get('/read/:recordId', (req, res) => this.getReadRecord(req, res));
      this.router.post('/read', (req, res) => this.readRecord(req, res) ); 
   }

}

export default ReadRecordController;