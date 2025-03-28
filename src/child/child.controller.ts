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

   public async getChildrenEducationist(req: Request, res: Response): Promise<void> {
      try {
         const educationistId = req.params.educationistId;
         const children = await this.childRoutesService.getChildrenEducationist(Number(educationistId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: children,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_EDUCATIONISTS_BY_CHILD_ID,
         }).handle(res);
      }
   }

   public async getChildrenTherapist(req: Request, res: Response): Promise<void> {
      try {
         const { therapistId } = req.params;
         const children = await this.childRoutesService.getChildrenTherapist(Number(therapistId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: children,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_THERAPISTS_BY_CHILD_ID,
         }).handle(res);
      }
   }

   public initRoutes() {
      this.router.get('/child/educationist/:educationistId', (req, res) => this.getChildrenEducationist(req, res));
      this.router.get('/child/therapist/:therapistId', (req, res) => this.getChildrenTherapist(req, res));
   }

}

export default ChildRoutesController;