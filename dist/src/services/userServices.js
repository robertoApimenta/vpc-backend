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
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    createUser(fullName, email, cpf, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.default.create({ fullName, email, cpf, password });
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.findAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.findByPk(id);
        });
    }
    getUserByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.findOne({ where: { cpf } });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.default.findOne({ where: { email } });
        });
    }
    validateUser(credential, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.getUserByEmail(credential);
            if (!user) {
                user = yield this.getUserByCpf(credential);
            }
            if (!user) {
                return null;
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            return user;
        });
    }
    updateUser(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }
            if (updates.email || updates.cpf) {
                throw new Error('Cannot update email or CPF');
            }
            yield user.update(updates);
            return user;
        });
    }
}
exports.default = new UserService();
