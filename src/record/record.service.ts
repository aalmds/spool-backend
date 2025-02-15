import RecordRepository from "./record.repository";

class RecordService {
    private recordRepository: RecordRepository;

    constructor(recordRepository: RecordRepository) {
        this.recordRepository = recordRepository;
    }
}

export default RecordService;