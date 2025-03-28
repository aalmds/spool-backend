import TherapistRoutesRepository from "./therapist.repository";

class TherapistRoutesService {
   private therapistRoutesRepository: TherapistRoutesRepository;

   constructor(therapistRoutesRepository: TherapistRoutesRepository) {
      this.therapistRoutesRepository = therapistRoutesRepository;
   }
   
   getTherapist(ChildId: number) {
      return this.therapistRoutesRepository.getTherapist(ChildId);
   }

   createTherapist(name: string, email: string, licenseNumber: string, specialization: string) {
      return this.therapistRoutesRepository.createTherapist(name, email, licenseNumber, specialization);
   }

}

export default TherapistRoutesService;