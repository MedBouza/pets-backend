import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import errorHandler from '../helper/errorHandler';
import { getUserById } from '../services/userService';

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) throw new Error('Not authorized');

      const decoded = verify(token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
      if (!decoded._id) {
         throw new Error("id doesn't exist in decode token");
      }
      const user = await getUserById(decoded._id);
      if (!user) {
         console.log('here');
         throw new Error('user not found');
      }
      res.locals.loggedInUser = user;
      next();
   } catch (error) {
      errorHandler(error, res);
   }
};
