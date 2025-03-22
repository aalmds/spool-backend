import RecordRepository from "./record.repository";

class RecordService {
    private recordRepository: RecordRepository;
    private validRoles = ['Child','Educationist', 'Therapist'];
    constructor(recordRepository: RecordRepository) {
        this.recordRepository = recordRepository;
    }

  async getRecordsByChild(childId: number, authorRole?: number, limit?: number, page?: number) {
    const role = authorRole !== undefined ? this.validRoles[authorRole] : undefined;
    if (role && !this.validRoles.includes(role)) {
        throw new Error('Invalid role');
    }

    page = page || 1;
    limit = limit || 10;

    return this.recordRepository.getRecordsByChild(childId, limit, page, role);
  }

  async getRecordsByChildAndTherapist(childId: number, therapistId: number) {
    return this.recordRepository.getRecordsByChildAndTherapist(childId, therapistId);
  }

  async getRecordsByChildAndEducationist(childId: number, educationistId: number) {
    return this.recordRepository.getRecordsByChildAndEducationist(childId, educationistId);
  }

  async getRecordsByTherapist(therapistId: number, status?: boolean) {

    return this.recordRepository.getRecordsByTherapist(therapistId, status);
  }

  async getRecordsByEducationist(educationistId: number, status?: boolean) {
    return this.recordRepository.getRecordsByEducationist(educationistId, status);
  }
}

export default RecordService;