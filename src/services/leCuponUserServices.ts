import axiosInstance from '../config/axiosConfig';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.EMAIL_LECUPON;
const password = process.env.PASSWORD_LECUPON;

interface AuthResponse {
    auth_token: string;
}

interface LecuponUser {
    id: number;
    name: string;
    email: string;
    cellphone: string;
    cpf: string;
}

class LecuponServiceUserServices {
    private authToken: string | null = null;

    async authenticate(): Promise<void> {
        try {
            const response = await axiosInstance.post<AuthResponse>('/client/v2/sign_in', {
                email,
                password,
            });
            this.authToken = response.data.auth_token;
        } catch (error) {
            console.error('Erro ao autenticar na API Lecupon:', error);
            throw new Error('Não foi possível autenticar na API Lecupon');
        }
    }

    getToken(): string | null {
        return this.authToken;
    }

    async createUserOnLecupon(userData: any): Promise<LecuponUser> {
        if (!this.authToken) {
            await this.authenticate();
        }

        try {
            const response = await axiosInstance.post<LecuponUser>('/client/v2/businesses/1/users', userData, {
                headers: {
                    'X-ClientEmployee-Token': this.authToken as string,
                    'X-ClientEmployee-Email': email as string,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar usuário na API Lecupon:', error);
            throw new Error('Não foi possível criar o usuário na API Lecupon');
        }
    }
}

export default new LecuponServiceUserServices();
