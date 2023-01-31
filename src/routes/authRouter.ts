import { Router } from 'express';
import { userLogin, userSignUp } from '../controllers/authController';
const router = Router();
const USER_PREFIX = '/users';

router.post(USER_PREFIX + '/login', userLogin);
router.post(USER_PREFIX + '/sign-up', userSignUp);

export default router;
