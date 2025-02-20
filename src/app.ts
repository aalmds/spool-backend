import express from 'express';
import RecordController from './record/record.controller';
import RecordService from './record/record.service';
import { Router } from 'express';
import { injector } from './common';

const app: express.Express = express();
const router: express.Router = Router();
const prefix: string = '/api';

app.use(express.json());

app.use(
    prefix,
    new RecordController(router, injector.getService(RecordService)).router
);

export default app;