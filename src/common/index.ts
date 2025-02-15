import Injector from "./injector";
import RecordRepository from "../record/record.repository";
import RecordService from "../record/record.service";

export const injector = new Injector();

injector.registerRepository(
    RecordRepository, 
    new RecordRepository()
);

injector.registerService(
    RecordService,
    new RecordService(injector.getRepository(RecordRepository))
);