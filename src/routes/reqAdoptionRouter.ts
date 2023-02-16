import { Router } from 'express';
import {
  getReceivedReq,
  getSentReq,
  sendReq,
} from '../controllers/reqAdoptionController';
import { requireUser } from '../middleware/requireUser';
const reqRouter = Router();
const REQ_PREFIX = '/adopt';
reqRouter.post(`${REQ_PREFIX}/create`, requireUser, sendReq);
reqRouter.get(`${REQ_PREFIX}/sentreq`, requireUser, getSentReq);
reqRouter.get(`${REQ_PREFIX}/receivedreq`, requireUser, getReceivedReq);

export default reqRouter;
