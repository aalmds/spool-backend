import TherapistRoutesRepository from "./therapist.repository";

class TherapistRoutesService {
   private therapistRoutesRepository: TherapistRoutesRepository;

   constructor(therapistRoutesRepository: TherapistRoutesRepository) {
      this.therapistRoutesRepository = therapistRoutesRepository;
   }
   
   getTherapist(ChildId: number) {
      return this.therapistRoutesRepository.getTherapist(ChildId);
   }

   async createTherapist(name: string, email: string, licenseNumber: string, specialization: string, childId: number) {
      const therapist = await this.therapistRoutesRepository.createTherapist(name, email, licenseNumber, specialization);
      await this.therapistRoutesRepository.createChildTherapist(childId, therapist.id);
      return therapist;
   }

}

export default TherapistRoutesService;