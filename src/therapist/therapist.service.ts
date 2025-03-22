import TherapistRoutesRepository from "./therapist.repository";

class TherapistRoutesService {
   private therapistRoutesRepository: TherapistRoutesRepository;

   constructor(therapistRoutesRepository: TherapistRoutesRepository) {
      this.therapistRoutesRepository = therapistRoutesRepository;
   }
   
   getTherapist(ChildId: number) {
      return this.therapistRoutesRepository.getTherapist(ChildId);
   }

   sendToken(therapistId: number) {
      return this.therapistRoutesRepository.sendToken(therapistId);
   }

}

export default TherapistRoutesService;