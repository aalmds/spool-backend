import { ParsedQs } from "qs";
import { FailureResult, Result, SuccessResult } from "../common/results";
import EducationistRoutesService from "./educationist.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class EducationistRoutesController {
    public router;
    private educationistRoutesService: EducationistRoutesService;

   constructor(router: Router, educationistRoutesService: EducationistRoutesService) {
      this.router = router;
      this.educationistRoutesService = educationistRoutesService;
      this.initRoutes();
   }

   public async getChildren(req: Request, res: Response): Promise<void> {
      try {
         const { educationistId } = req.params;
         const children = await this.educationistRoutesService.getChildren(Number(educationistId));

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: children,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_CHILDREN_BY_EDUCATIONIST,
         }).handle(res);
      }
   }


   public initRoutes() {
      this.router.get('/educationist/:educationistId/child', (req, res) => this.getChildren(req, res));
   }

}

export default EducationistRoutesController;