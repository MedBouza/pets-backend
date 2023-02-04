import { Request, Response } from 'express';
import { userLoginService, userSignUpService } from '../services/authService';

import dotenv from 'dotenv';
import errorHandler from '../helper/errorHandler';

dotenv.config();

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
  const { name, email, password } = req.body;
  try {
    const result = await userSignUpService({ name, email, password });
    res.json(result);
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
