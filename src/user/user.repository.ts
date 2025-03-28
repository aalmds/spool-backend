import { PrismaClient } from '@prisma/client';
import { Errors } from '../common/errors';
import { Roles } from '../common/roles';

class UserRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    public getUser(role: string, data: any): Promise<any> {
        switch (role) {
           case Roles.Educationist:
              return this.prisma.educationist.findUnique(data);
           case Roles.Therapist:
              return this.prisma.therapist.findUnique(data);
           default:
              return this.prisma.child.findUnique(data);
        }
    }

    public async getUserByToken(token: string, role: string): Promise<any> {
        try {
            return await this.getUser(role, {
                where: {
                    token: token,
                },
            });
        } catch (e) {
            console.error(Errors.GET_USER, e);
            throw new Error(Errors.GET_USER);
        }
    }
}

export default UserRepository;
