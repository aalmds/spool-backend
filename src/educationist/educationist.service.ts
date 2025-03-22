import EducationistRoutesRepository from "./educationist.repository";

class EducationistRoutesService {
   private educationistRoutesRepository: EducationistRoutesRepository;

   constructor(educationistRoutesRepository: EducationistRoutesRepository) {
      this.educationistRoutesRepository = educationistRoutesRepository;
   }
   


   getChildren(educationistId: number) {
      return this.educationistRoutesRepository.getChildren(educationistId);
   }

}

export default EducationistRoutesService;