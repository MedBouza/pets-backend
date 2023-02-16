import { Request, Response } from 'express';
import errorHandler from '../helper/errorHandler';
import {
  addDemand,
  getReceivedDemand,
  getSentDemand,
} from '../services/reqAdoptionService';

export const sendReq = async (req: Request, res: Response) => {
  const { loggedInUser } = res.locals;
  const { id } = req.body;
  try {
    if (!id) throw new Error('id not found');

    const newReq = await addDemand(id, loggedInUser);
    res.status(201).json(newReq);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const getSentReq = async (req: Request, res: Response) => {
  const { loggedInUser } = res.locals;
  try {
    const req = await getSentDemand(loggedInUser._id);
    res.status(201).json(req);
  } catch (error) {
    errorHandler(error, res);
  }
};
export const getReceivedReq = async (req: Request, res: Response) => {
  const { loggedInUser } = res.locals;
  try {
    const req = await getReceivedDemand(loggedInUser._id);
    res.status(201).json(req);
  } catch (error) {
    errorHandler(error, res);
  }
};
