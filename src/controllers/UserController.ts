import { Request, Response } from 'express';
import errorHandler from '../helper/errorHandler';
import { addUser, deleteUserById, getUserById, getUserByName, updateUserById } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
   const { user } = req.body;
   try {
      if (!user) throw new Error('user not found');
      const newUser = await addUser(user);
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

   try {
      const user = await updateUserById(loggedInUser._id, req.body);
      res.status(200).json(user);
   } catch (error) {
      errorHandler(error, res);
   }
};
export const deleteUser = async (req: Request, res: Response) => {
   const { loggedInUser } = res.locals;
   try {
      const User = await deleteUserById(loggedInUser);
      res.status(200).json({ message: 'deleted' });
   } catch (error) {
      errorHandler(error, res);
   }
};
