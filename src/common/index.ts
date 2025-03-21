import Injector from "./injector";
import RecordRepository from "../record/record.repository";
import RecordService from "../record/record.service";
import ReadRecordRepository from "../read-record/read-record.repository";
import ReadRecordService from "../read-record/read-record.service";

export const injector = new Injector();

injector.registerRepository(
    RecordRepository, 
    new RecordRepository()
);

injector.registerService(
    RecordService,
    new RecordService(injector.getRepository(RecordRepository))
);

injector.registerRepository(
   ReadRecordRepository, 
   new ReadRecordRepository()
);

injector.registerService(
   ReadRecordService,
   new ReadRecordService(injector.getRepository(ReadRecordRepository))
);