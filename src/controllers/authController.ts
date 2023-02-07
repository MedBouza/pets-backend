import { Request, Response } from 'express';
import {
  generateAccessToken,
  refreshTokenService,
  userLoginService,
  userSignUpService,
} from '../services/authService';

import dotenv from 'dotenv';
import errorHandler from '../helper/errorHandler';
import { getUserById } from '../services/userService';

dotenv.config();
interface JwtPayload {
  _id: string;
}

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await userLoginService(email, password);
    res.json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const userSignUp = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const result = await userSignUpService({
      firstname,
      lastname,
      email,
      password,
    });
    res.json(result);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  try {
    const result = await refreshTokenService(refreshToken);
    const { _id } = result as JwtPayload;
    const user = await getUserById(_id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const accessToken = generateAccessToken(user);

    res.send({ accessToken });
  } catch (error) {
    errorHandler(error, res);
  }
};

// with then catch
// export const userLogins = (req: Request, res: Response) => {
//    const { email, password } = req.body;
//    userLoginService(email, password)
//       .then((result) => {
//          res.json(result);
//       })
//       .catch((error) => res.status(500).json(error));
// };
