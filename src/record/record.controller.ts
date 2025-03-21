import { Errors } from "../common/errors";
import { FailureResult, Result, SuccessResult } from "../common/results";
import RecordService from "./record.service";
import { Router, Request, Response } from 'express';

class RecordController {
    public router: Router;
    private recordService: RecordService;

    constructor(router: Router, recordService: RecordService) {
        this.router = router;
        this.recordService = recordService;
        this.initRoutes();
    }

    async getByChild(req: Request, res: Response) : Promise<void> {
        try {
            const childId = Number(req.params.childId);
            const { filter, limit, page } = req.query;
            const records = await this.recordService.getRecordsByChild(
                childId,
                filter as string,
                Number(limit),
                Number(page));
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: records
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_RECORDS
            }).handle(res);
        }
    }

    async getByChildAndTherapist(req: Request, res: Response): Promise<void>  {
        try {
            const { childId, therapistId } = req.params;
            console.log(childId, therapistId);
            const records = await this.recordService.getRecordsByChildAndTherapist(Number(childId), Number(therapistId));
            console.log(records);
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: records
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_RECORDS
            }).handle(res);
        }
    }

    async getByChildAndEducationist(req: Request, res: Response) : Promise<void> {
        try {
            const { childId, educationistId } = req.params;
            const records = await this.recordService.getRecordsByChildAndEducationist(Number(childId), Number(educationistId));
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: records
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_RECORDS
            }).handle(res);
        }
    }

    async getByTherapist(req: Request, res: Response) : Promise<void> {
        try {
            const therapistId = Number(req.params.therapistId);
            const status = req.query.status as string;
            const records = await this.recordService.getRecordsByTherapist(therapistId, status);
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: records
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_RECORDS
            }).handle(res);
        }
    }

    async getByEducationist(req: Request, res: Response) : Promise<void> {
        try {
            const educationistId = Number(req.params.educationistId);
            const status = req.query.status as string;
            const records = await this.recordService.getRecordsByEducationist(educationistId, status);
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: records
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.GET_RECORDS
            }).handle(res);
        }
    }

    public initRoutes() {
        this.router.get('/record/child/:childId', async (req, res) => this.getByChild(req, res));
        this.router.get('/record/child/:childId/therapist/:therapistId', async (req, res) => this.getByChildAndTherapist(req, res));
        this.router.get('/record/child/:childId/educationist/:educationistId', async (req, res) => this.getByChildAndEducationist(req, res));
        this.router.get('/record/educationist/:educationistId', async (req, res) => this.getByEducationist(req, res));
        this.router.get('/record/therapist/:therapistId', async (req, res) => this.getByTherapist(req, res));
    }
}

export default RecordController;
