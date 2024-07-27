"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = (0, express_1.Router)();
router.post('/users', userControllers_1.default.createUser);
router.get('/users', userControllers_1.default.getAllUsers);
router.get('/users/:id', userControllers_1.default.getUserById);
router.get('/users/cpf/:cpf', userControllers_1.default.getUserByCpf);
router.get('/users/email/:email', userControllers_1.default.getUserByEmail);
router.post('/login', userControllers_1.default.loginUser);
exports.default = router;
