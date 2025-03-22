import RecordRepository from "./record.repository";

class RecordService {
    private recordRepository: RecordRepository;
    private validRoles = ['Educationist', 'Therapist', 'Child'];
    constructor(recordRepository: RecordRepository) {
        this.recordRepository = recordRepository;
    }

  async getRecordsByChild(childId: number, authorRole?: string, limit?: number, page?: number) {
    if (authorRole && !this.validRoles.includes(authorRole)) {
      throw new Error('Invalid role');
    }

    page = page || 1;
    limit = limit || 10;

    return this.recordRepository.getRecordsByChild(childId, limit, page, authorRole);
  }

  async getRecordsByChildAndTherapist(childId: number, therapistId: number) {
    return this.recordRepository.getRecordsByChildAndTherapist(childId, therapistId);
  }

  async getRecordsByChildAndEducationist(childId: number, educationistId: number) {
    return this.recordRepository.getRecordsByChildAndEducationist(childId, educationistId);
  }

  async getRecordsByTherapist(therapistId: number, status?: string) {

    return this.recordRepository.getRecordsByTherapist(therapistId, status);
  }

  async getRecordsByEducationist(educationistId: number, status?: string) {
    return this.recordRepository.getRecordsByEducationist(educationistId, status);
  }
}

export default RecordService;