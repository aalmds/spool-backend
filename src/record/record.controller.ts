import { Errors } from "../common/errors";
import { FailureResult, Result, SuccessResult } from "../common/results";
import RecordService from "./record.service";
import NotificationService from "../notification/notification.service";
import { Router, Request, Response } from 'express';

class RecordController {
    public router: Router;
    private recordService: RecordService;
    private notificationService: NotificationService;

    constructor(router: Router, recordService: RecordService, notificationService: NotificationService) {
        this.router = router;
        this.recordService = recordService;
        this.notificationService = notificationService;
        this.initRoutes();
    }

    async getByChild(req: Request, res: Response) : Promise<void> {
        try {
            const childId = Number(req.params.childId);
            const { filter, limit, page } = req.query;
            const records = await this.recordService.getRecordsByChild(
                childId,
                Number(filter),
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
            const { limit, page } = req.query;
            const records = await this.recordService.getRecordsByChildAndTherapist(
                Number(childId),
                Number(therapistId),
                Number(limit),
                Number(page)
            );
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
            const { limit, page } = req.query;
            const records = await this.recordService.getRecordsByChildAndEducationist(
                Number(childId),
                Number(educationistId),
                Number(limit),
                Number(page)
            );
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
            const { limit, page } = req.query;
            const status = req.query.status === 'true' ? true : req.query.status === 'false' ? false : undefined;
            const records = await this.recordService.getRecordsByTherapist(
                therapistId, 
                status,
                Number(limit),
                Number(page)
            );
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
            const { limit, page } = req.query;
            const status = req.query.status === 'true' ? true : req.query.status === 'false' ? false : undefined;
            const records = await this.recordService.getRecordsByEducationist(
                educationistId,
                status,
                Number(limit),
                Number(page),
            );
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

    async createRecord(req: Request, res: Response) : Promise<void> {
        try {
            const { childId, authorId, authorRole, authorName, content, symptoms } = req.body;
            const record = await this.recordService.createRecord(
                childId,
                authorId,
                authorRole,
                authorName,
                content,
                symptoms
            );

            await this.notificationService.broadcastNotification(
                childId,
                authorId,
                authorRole
            );

            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: record
            }).handle(res);
        } catch (error) {
            new FailureResult({
                msg: Errors.CREATE_RECORD
            }).handle(res);
        }
    }

    public async getUnreadRecords(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            var { role, page, limit } = req.query;
            
            const unreadRecords = await this.recordService.getUnreadRecords(
                Number(userId),
                String(role),
                Number(limit),
                Number(page)
            );
            
            new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
                data: unreadRecords,
            }).handle(res);
        } catch (e) {
            new FailureResult({
                msg: Errors.GET_UNREAD_RECORDS,
            }).handle(res);
        }
    }

    public initRoutes() {
        this.router.get('/record/child/:childId', async (req, res) => this.getByChild(req, res));
        this.router.get('/record/child/:childId/therapist/:therapistId', async (req, res) => this.getByChildAndTherapist(req, res));
        this.router.get('/record/child/:childId/educationist/:educationistId', async (req, res) => this.getByChildAndEducationist(req, res));
        this.router.get('/record/educationist/:educationistId', async (req, res) => this.getByEducationist(req, res));
        this.router.get('/record/therapist/:therapistId', async (req, res) => this.getByTherapist(req, res));
        this.router.post('/record', async (req, res) => this.createRecord(req, res));
        this.router.get('/alerts/:userId', (req, res) => this.getUnreadRecords(req, res));
    }
}

export default RecordController;
