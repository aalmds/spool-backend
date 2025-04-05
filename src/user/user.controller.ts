
import { FailureResult, Result, SuccessResult } from "../common/results";
import UserService from "./user.service";
import { Request, Response, Router } from "express";
import { Errors } from "../common/errors";

class UserController {
    public router;
    private userService: UserService;

   constructor(router: Router, userService: UserService) {
      this.router = router;
      this.userService = userService;
      this.initRoutes();
   }

    public async getUserbyToken(req: Request, res: Response) {
        try {
            const userToken: string = req.params.userToken;
            const user = await this.userService.getUserByToken(userToken);
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: user
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_USER
            }).handle(res);
        }
    }
   

    public initRoutes() {
        this.router.get('/user/:userToken', (req, res) => this.getUserbyToken(req, res));
    }

}

export default UserController;