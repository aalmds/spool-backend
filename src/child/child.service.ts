import ChildRoutesRepository from "./child.repository";

class ChildRoutesService {
   private childRoutesRepository: ChildRoutesRepository;

   constructor(childRoutesRepository: ChildRoutesRepository) {
      this.childRoutesRepository = childRoutesRepository;
   }
   


   getEducationist(childId: number, filter: string) {
      return this.childRoutesRepository.getChildEducationist(childId, filter);
   }

   getTherapist(childId: number) {
      return this.childRoutesRepository.getChildTherapist(childId);
   }

}

export default ChildRoutesService;