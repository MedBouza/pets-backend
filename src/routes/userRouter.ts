import { Router } from 'express';
import {
  readAll,
  readUser,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/UserController';
import { requireUser } from '../middleware/requireUser';
import upload from '../middleware/upload';

const USER_PREFIX = '/users';

const userRouter = Router();

userRouter.get(`${USER_PREFIX}/all`, readAll);
userRouter.post(`${USER_PREFIX}/create`, upload.single('avatar'), createUser);
userRouter.delete(`${USER_PREFIX}/delete`, requireUser, deleteUser);
userRouter.patch(
  `${USER_PREFIX}/update`,
  requireUser,
  upload.single('avatar'),
  updateUser,
);
userRouter.get(`${USER_PREFIX}/user/:userId`, readUser);

export default userRouter;
