import RecordRepository from "./record.repository";
import { Roles } from "../common/roles";

class RecordService {
  private recordRepository: RecordRepository;
  private validRoles: string[] = [Roles.Child, Roles.Educationist, Roles.Therapist];
  constructor(recordRepository: RecordRepository) {
      this.recordRepository = recordRepository;
  }

  private getPagination(page?: number, limit?: number) : any{
    limit = limit || 10;
    page = page || 1;
    return { page, limit };
  }
  
  async getRecordsByChild(childId: number, authorRole?: number, limit?: number, page?: number) {
    const role = authorRole !== undefined ? this.validRoles[authorRole] : undefined;
    if (role && !this.validRoles.includes(role)) {
        throw new Error('Invalid role');
    }

    ({ page, limit } = this.getPagination(page, limit));

    return this.recordRepository.getRecordsByChild(childId, limit!, page!, role);
  }

  async getRecordsByChildAndTherapist(childId: number, therapistId: number, limit?: number, page?: number) {
    ({ page, limit } = this.getPagination(page, limit));
    return this.recordRepository.getRecordsByChildAndTherapist(childId, therapistId, limit!, page!);
  }

  async getRecordsByChildAndEducationist(childId: number, educationistId: number, limit?: number, page?: number) {
    ({ page, limit } = this.getPagination(page, limit));
    return this.recordRepository.getRecordsByChildAndEducationist(childId, educationistId, limit!, page!);
  }

  async getRecordsByTherapist(therapistId: number, status?: boolean, limit?: number, page?: number) {
    ({ page, limit } = this.getPagination(page, limit));
    return this.recordRepository.getRecordsByTherapist(therapistId, limit!, page!, status);
  }

  async getRecordsByEducationist(educationistId: number, status?: boolean, limit?: number, page?: number) {
    ({ page, limit } = this.getPagination(page, limit));
    return this.recordRepository.getRecordsByEducationist(educationistId, limit!, page!, status);
  }

  async createRecord(childId: number, authorId: number, authorRole: string, authorName:string, content: string, symptoms: string[]) {
    if (!this.validRoles.includes(authorRole)) {
      throw new Error('Invalid role');
    }
    return this.recordRepository.createRecord(childId, authorId, authorRole, authorName, content, symptoms);
  }
}

export default RecordService;