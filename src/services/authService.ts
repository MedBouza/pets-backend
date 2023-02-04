import Users, { IUserModel } from '../models/User';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { addUser } from './userService';

export const getUserByEmail = (email: string) => Users.findOne({ email });

export const userLoginService = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('user not found');

  const checkPassword = await bcrypt.compare(password, user.password || '');
  if (!checkPassword) throw new Error('Password Incorrect');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { user, accessToken, refreshToken };
};
export const userSignUpService = async (userData: Partial<IUserModel>) => {
  const user = await addUser(userData);
  if (!user) throw new Error('user not found');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { user, accessToken, refreshToken };
};

export const generateAccessToken = (user: Partial<IUserModel>) =>
  jwt.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' },
  );

export const generateRefreshToken = (user: Partial<IUserModel>) => {
  const refreshTokens = [];

  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '20m' },
  );
  refreshTokens.push(refreshToken);
  return refreshToken;
};
