import { Router } from 'express';
import UserController from '../controllers/userControllers';

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/users/cpf/:cpf', UserController.getUserByCpf);
router.get('/users/email/:email', UserController.getUserByEmail);

router.post('/login', UserController.loginUser);



export default router;
