import RecordService from "./record.service";
import { Router, Request, Response } from 'express';

class RecordController {
    public router;
    private prefix: string = '/record';
    private recordService: RecordService;

    constructor(router: Router, recordService: RecordService) {
        this.router = router;
        this.recordService = recordService;

        this.init();
    }

    private init() {
        this.router.get(`${this.prefix}/example`, (req: Request, res: Response) => {
            this.example(req, res);
          });
    }

    private example(req: Request, res: Response) {
        return res.send('Spool!');
    }
}

export default RecordController;