import UserRepository from "./user.repository";
import { Roles } from "../common/roles";

class RecordService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public getChildAge(birthDate: Date) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    public userWrapper(role: Roles, user: any) {
        switch (role) {
            case Roles.Child:
                return {
                    id: user.id,
                    role: role,
                    name: user.name,
                    parentName: user.parentName,
                    email: user.email,
                    birthDate: user.birthDate, 
                    supportLevel: user.supportLevel,
                    class: user.class,
                    age: this.getChildAge(user.birthDate),
                    token: user.token
                };
            case Roles.Educationist:
                return {
                    id: user.id,       
                    role: role,
                    name: user.name,
                    email: user.email,
                    specialization: user.specialization,
                    token: user.token
                };
            case Roles.Therapist:
                return {
                    id: user.id,
                    role: role,
                    name: user.name,
                    email: user.email,
                    specialization: user.specialization,
                    licenseNumber: user.licenseNumber,
                    token: user.token
                };
        }
    }

    public async getUserByToken(token: string) {
        const roles = [Roles.Child, Roles.Educationist, Roles.Therapist];
        for (const role of roles) {
            const user = await this.userRepository.getUserByToken(token, role);
            if (user) {
                console.log(user);
                return this.userWrapper(role, user);
            }
        }
    }
}

export default RecordService;