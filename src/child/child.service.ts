import ChildRoutesRepository from "./child.repository";

class ChildRoutesService {
   private childRoutesRepository: ChildRoutesRepository;

   constructor(childRoutesRepository: ChildRoutesRepository) {
      this.childRoutesRepository = childRoutesRepository;
   }
   


   getChildrenEducationist(educationistId: number) {
      return this.childRoutesRepository.getChildrenEducationist(educationistId);
   }

   getChildrenTherapist(therapistId: number) {
      return this.childRoutesRepository.getChildrenTherapist(therapistId);
   }

}

export default ChildRoutesService;