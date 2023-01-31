import { Router } from 'express';
import { readAll, readUser, createUser, deleteUser, updateUser } from '../controllers/UserController';
import { requireUser } from '../middleware/requireUser';

const USER_PREFIX = '/users';

const userRouter = Router();

userRouter.get(USER_PREFIX + '/all', readAll);
userRouter.get(USER_PREFIX + '/user/:userId', readUser);
userRouter.post(USER_PREFIX + '/create', createUser);
userRouter.delete(USER_PREFIX + '/delete', requireUser, deleteUser);
userRouter.patch(USER_PREFIX + '/update', requireUser, updateUser);

export default userRouter;
