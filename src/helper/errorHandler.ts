import { Response } from 'express';

const errorHandler = (e: Error, res: Response) => {
   if (e instanceof Error) {
      res.status(500).json({ error: e.message, stack: e.stack });
   } else res.status(500).json({ error: 'Unknown Error' });
};
export default errorHandler;
