import { ParsedQs } from "qs";
import { FailureResult, Result, SuccessResult } from "../common/results";
import TherapistRoutesService from "./therapist.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class TherapistRoutesController {
    public router;
    private therapistRoutesService: TherapistRoutesService;

   constructor(router: Router, therapistRoutesService: TherapistRoutesService) {
      this.router = router;
      this.therapistRoutesService = therapistRoutesService;
      this.initRoutes();
   }

   public async getChildren(req: Request, res: Response): Promise<void> {
      try {
         const { therapisttId } = req.params;
         const children = await this.therapistRoutesService.getChildren(Number(therapisttId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: children,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_CHILDREN_BY_THERAPIST,
         }).handle(res);
      }
   }

   public async sendToken(req: Request, res: Response): Promise<void> {
      try {
         const { therapistId } = req.body;
         await this.therapistRoutesService.sendToken(therapistId);
         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.SEND_TOKEN,
         }).handle(res);
      }
   }


   public initRoutes() {
      this.router.get('/therapist/:therapistId/child', (req, res) => this.getChildren(req, res));
      this.router.post('/therapist', (req, res) => this.sendToken(req, res)); 
   }

}

export default TherapistRoutesController;