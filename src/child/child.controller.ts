import { ParsedQs } from "qs";
import { FailureResult, Result, SuccessResult } from "../common/results";
import ChildRoutesService from "./child.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class ChildRoutesController {
    public router;
    private childRoutesService: ChildRoutesService;

   constructor(router: Router, childRoutesService: ChildRoutesService) {
      this.router = router;
      this.childRoutesService = childRoutesService;
      this.initRoutes();
   }

   public async getEducationist(req: Request, res: Response): Promise<void> {
      try {
         const childId = req.params.childId;
         const { filter } = req.query;
         const educationist = await this.childRoutesService.getEducationist(Number(childId), filter as string);

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: educationist,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_EDUCATIONISTS_BY_CHILD_ID,
         }).handle(res);
      }
   }

   public async getTherapist(req: Request, res: Response): Promise<void> {
      try {
         const { childId } = req.params;
         const therapist = await this.childRoutesService.getTherapist(Number(childId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: therapist,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_THERAPISTS_BY_CHILD_ID,
         }).handle(res);
      }
   }

   public initRoutes() {
      this.router.get('/child/:childId/educationist', (req, res) => this.getEducationist(req, res));
      this.router.get('/child/:childId/therapist', (req, res) => this.getTherapist(req, res));
   }

}

export default ChildRoutesController;