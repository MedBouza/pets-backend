import { Router } from 'express';
import {
  refreshToken,
  userLogin,
  userSignUp,
} from '../controllers/authController';
const router = Router();
const USER_PREFIX = '/users';

router.post(`${USER_PREFIX}/login`, userLogin);
router.post(`${USER_PREFIX}/sign-up`, userSignUp);
router.post(`${USER_PREFIX}/refresh`, refreshToken);

export default router;
