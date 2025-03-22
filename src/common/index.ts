import Injector from "./injector";
import RecordRepository from "../record/record.repository";
import RecordService from "../record/record.service";
import ReadRecordRepository from "../read-record/read-record.repository";
import ReadRecordService from "../read-record/read-record.service";
import ChildRoutesService from "../child/child.service";  
import ChildRoutesRepository from "../child/child.repository";  
import EducationistRoutesService from "../educationist/educationist.service";  
import EducationistRoutesRepository from "../educationist/educationist.repository";  
import TherapistRoutesService from "../therapist/therapist.service";  
import TherapistRoutesRepository from "../therapist/therapist.repository";  

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
  
injector.registerRepository(
    ChildRoutesRepository,
    new ChildRoutesRepository()
);

injector.registerService(  
    ChildRoutesService,  
    new ChildRoutesService(injector.getRepository(ChildRoutesRepository))  
 ); 

injector.registerRepository(
    EducationistRoutesRepository,
    new EducationistRoutesRepository()
);

injector.registerService(  
    EducationistRoutesService,  
    new EducationistRoutesService(injector.getRepository(EducationistRoutesRepository))  
 );  

injector.registerRepository(
    TherapistRoutesRepository,
    new TherapistRoutesRepository()
);  
 
injector.registerService(  
   TherapistRoutesService,  
   new TherapistRoutesService(injector.getRepository(TherapistRoutesRepository))  
); 