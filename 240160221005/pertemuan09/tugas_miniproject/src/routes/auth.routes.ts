import { Router } from 'express';
import * as controller from '../controller/auth.controller';
import { validateRegister, validateLogin } from '../validators/auth.validator';

const router = Router();

router.post('/register', validateRegister, controller.register);
router.post('/login',    validateLogin,    controller.login);

export default router;