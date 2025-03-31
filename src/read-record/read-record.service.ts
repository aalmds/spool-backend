import ReadRecordRepository from "./read-record.repository";

class ReadRecordService {
   private readRecordRepository: ReadRecordRepository;

   constructor(readRecordRepository: ReadRecordRepository) {
      this.readRecordRepository = readRecordRepository;
   }
   
   readRecord(recordId: number, userId: number, userRole: string) {
      return this.readRecordRepository.readRecord(recordId, userId, userRole);
   }

   getReadRecord(recordId: number) {
      return this.readRecordRepository.getReadRecord(recordId);
   }
}

export default ReadRecordService;