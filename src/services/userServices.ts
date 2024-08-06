import bcrypt from 'bcrypt';
import User, { UserAttributes } from '../models/users';

import LecuponServiceUserServices from './leCuponUserServices';

class UserService {

    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(id: number) {
        return await User.findByPk(id);
    }

    async getUserByCpf(cpf: string) {
        return await User.findOne({ where: { cpf } });
    }

    async getUserByEmail(email: string) {
        return await User.findOne({ where: { email } });
    }

    async createUser(fullName: string, email: string, cpf: string, password: string, insurance: number) {

        const userDataLeCupon = {
            name: fullName,
            email,
            cpf,
            password,
        };

        const userLeCupon = await LecuponServiceUserServices.createUserOnLecupon(userDataLeCupon);

        const user = await User.create({ id: userLeCupon.id.toString(), fullName, email, cpf, password, insurance });
        return user;
    }

    async validateUser(credential: string, password: string) {
        let user = await this.getUserByEmail(credential);
        if (!user) {
            user = await this.getUserByCpf(credential);
        }
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async updateUser(id: number, updates: Partial<UserAttributes>) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        if (updates.email || updates.cpf) {
            throw new Error('Cannot update email or CPF');
        }

        await user.update(updates);
        return user;
    }
}

export default new UserService();

