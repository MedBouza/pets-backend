import { Response } from 'express';
import Logging from '../library/logging';

const errorHandler = (e: Error, res: Response) => {
  if (e instanceof Error) {
    res.status(500).json({ message: e.message, stack: e.stack });
  } else res.status(500).json({ message: 'Unknown Error' });
  Logging.error(e);
};
export default errorHandler;
