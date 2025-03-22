import TherapistRoutesRepository from "./therapist.repository";

class TherapistRoutesService {
   private therapistRoutesRepository: TherapistRoutesRepository;

   constructor(therapistRoutesRepository: TherapistRoutesRepository) {
      this.therapistRoutesRepository = therapistRoutesRepository;
   }
   


   getChildren(therapistId: number) {
      return this.therapistRoutesRepository.getChildren(therapistId);
   }

   sendToken(therapistId: number) {
      return this.therapistRoutesRepository.sendToken(therapistId);
   }

}

export default TherapistRoutesService;