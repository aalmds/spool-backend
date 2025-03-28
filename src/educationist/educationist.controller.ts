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

   public async getEducationist(req: Request, res: Response): Promise<void> {
      try {
         const childId = Number(req.params.childId);
         const { filter } = req.query;
         const educationists = await this.educationistRoutesService.getEducationist(Number(childId), filter as string);

         new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: educationists,
         }).handle(res);
      } catch (e) {
         new FailureResult({
            msg: Errors.GET_CHILDREN_BY_EDUCATIONIST,
         }).handle(res);
      }
   }


   public initRoutes() {
      this.router.get('/educationist/:childId', (req, res) => this.getEducationist(req, res));
   }

}

export default EducationistRoutesController;