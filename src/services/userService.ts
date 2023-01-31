import Users, { IUser, IUserModel } from '../models/User';

export const addUser = async (userData: Partial<IUserModel>) => await Users.create(userData);

export const getUserById = async (id: string) => await Users.findById(id);

export const getUserByName = async (keyword?: string) => await Users.find(keyword ? { name: keyword } : {});

export const updateUserById = async (id: string, body: { name: string; email: string; password: string }) =>
   await Users.findByIdAndUpdate(id, body, { new: true });

export const deleteUserById = async (id: string) => await Users.findByIdAndDelete(id);
