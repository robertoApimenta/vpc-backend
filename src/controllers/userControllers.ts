import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/userServices';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

class UserController {
    async createUser(req: Request, res: Response) {
        const { fullName, email, cpf, phone, password, insurance } = req.body;
        if (!fullName || !email || !cpf || !phone || !password || !insurance) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const cpfExists = await UserService.getUserByCpf(cpf);
        if (cpfExists) {
            return res.status(400).json({ message: 'CPF já cadastrado.' });
        }

        const emailExists = await UserService.getUserByEmail(email);
        if (emailExists) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        try {
            const user = await UserService.createUser(fullName, email, cpf, phone, password, insurance);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar usuário.', error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuários', error });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await UserService.getUserById(Number(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    }

    async getUserByCpf(req: Request, res: Response) {
        const { cpf } = req.params;

        try {
            const user = await UserService.getUserByCpf(cpf);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        const { email } = req.params;

        try {
            const user = await UserService.getUserByEmail(email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error });
        }
    }

    async loginUser(req: Request, res: Response) {
        const { credential, password } = req.body;

        try {
            const user = await UserService.validateUser(credential, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials or password' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, cpf: user.cpf },
                secretKey,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error });
        }
    }
}

export default new UserController();