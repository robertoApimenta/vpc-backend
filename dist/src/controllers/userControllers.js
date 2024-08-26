"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = __importDefault(require("../services/userServices"));
const secretKey = process.env.JWT_SECRET || 'default_secret_key';
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, email, cpf, phone, password, insurance } = req.body;
            if (!fullName || !email || !cpf || !phone || !password || !insurance) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            const cpfExists = yield userServices_1.default.getUserByCpf(cpf);
            if (cpfExists) {
                return res.status(400).json({ message: 'CPF já cadastrado.' });
            }
            const emailExists = yield userServices_1.default.getUserByEmail(email);
            if (emailExists) {
                return res.status(400).json({ message: 'Email já cadastrado.' });
            }
            try {
                const user = yield userServices_1.default.createUser(fullName, email, cpf, phone, password, insurance);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar usuário.', error });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userServices_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar usuários', error });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userServices_1.default.getUserById(Number(id));
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar usuário', error });
            }
        });
    }
    getUserByCpf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf } = req.params;
            try {
                const user = yield userServices_1.default.getUserByCpf(cpf);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar usuário', error });
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                const user = yield userServices_1.default.getUserByEmail(email);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Erro ao buscar usuário', error });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { credential, password } = req.body;
            try {
                const user = yield userServices_1.default.validateUser(credential, password);
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials or password' });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, cpf: user.cpf }, secretKey, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login successful', token });
            }
            catch (error) {
                return res.status(500).json({ message: 'Internal server error', error });
            }
        });
    }
}
exports.default = new UserController();
