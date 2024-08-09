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
const axiosConfig_1 = __importDefault(require("../config/axiosConfig"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const email = process.env.EMAIL_LECUPON;
const password = process.env.PASSWORD_LECUPON;
class LecuponServiceUserServices {
    constructor() {
        this.authToken = null;
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axiosConfig_1.default.post('/client/v2/sign_in', {
                    email,
                    password,
                });
                this.authToken = response.data.auth_token;
            }
            catch (error) {
                console.error('Erro ao autenticar na API Lecupon:', error);
                throw new Error('Não foi possível autenticar na API Lecupon');
            }
        });
    }
    getToken() {
        return this.authToken;
    }
    createUserOnLecupon(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authToken) {
                yield this.authenticate();
            }
            try {
                const response = yield axiosConfig_1.default.post('/client/v2/businesses/1206/users', userData, {
                    headers: {
                        'X-ClientEmployee-Token': this.authToken,
                        'X-ClientEmployee-Email': email,
                    },
                });
                console.log('response ', response.data);
                return response.data;
            }
            catch (error) {
                console.error('Erro ao criar usuário na API Lecupon:', error);
                throw new Error('Não foi possível criar o usuário na API Lecupon');
            }
        });
    }
}
exports.default = new LecuponServiceUserServices();
