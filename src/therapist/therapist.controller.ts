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

   public async getTherapist(req: Request, res: Response): Promise<void> {
      try {
         const ChildId = Number(req.params.childId);
         const therapists = await this.therapistRoutesService.getTherapist(Number(ChildId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: therapists,
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
      this.router.get('/therapist/:childId', (req, res) => this.getTherapist(req, res));
      this.router.post('/therapist', (req, res) => this.sendToken(req, res)); 
   }

}

export default TherapistRoutesController;