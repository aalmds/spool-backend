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