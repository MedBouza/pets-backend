import { Request, Response } from 'express';
import errorHandler from '../helper/errorHandler';
import { IUser } from '../models/User';
import {
  addUser,
  deleteUserById,
  getUserById,
  getUserByName,
  updateUserById,
} from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  const user = req.body as IUser;
  const filename = req.file?.filename;

  try {
    if (!user) throw new Error('user not found');
    const newUser = await addUser({ ...user, avatar: filename });
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const readUser = async (req: Request, res: Response) => {
  const { userId } = req.params as { userId?: string };

  try {
    if (!userId) throw new Error('user not found');
    const User = await getUserById(userId);
    res.status(201).json(User);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const readAll = async (req: Request, res: Response) => {
  const { keyword } = req.query as { keyword?: string };
  try {
    const users = await getUserByName(keyword);
    res.status(201).json(users);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const { loggedInUser } = res.locals;
  const avatar = req.file?.filename;
  const userData = req.body;
  try {
    if (avatar) Object.assign(userData, { avatar });
    const user = await updateUserById(loggedInUser._id, userData);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { loggedInUser } = res.locals;
  try {
    await deleteUserById(loggedInUser);
    res.status(200).json({ message: 'deleted' });
  } catch (error) {
    errorHandler(error, res);
  }
};
