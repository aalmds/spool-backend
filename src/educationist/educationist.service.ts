import EducationistRoutesRepository from "./educationist.repository";

class EducationistRoutesService {
   private educationistRoutesRepository: EducationistRoutesRepository;

   constructor(educationistRoutesRepository: EducationistRoutesRepository) {
      this.educationistRoutesRepository = educationistRoutesRepository;
   }
   


   getEducationist(ChildId: number, filter: string) {
      return this.educationistRoutesRepository.getEducationist(ChildId, filter);
   }

}

export default EducationistRoutesService;