import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import userRouter from './routes/userRouter';
import petRouter from './routes/petRouter';
import login from './routes/authRouter';
import cors from 'cors';
import reqRouter from './routes/reqAdoptionRouter';
const app = express();

const StartServer = () => {
  app.use((req, res, next) => {
    res.on('finish', () => {
      Logging.info(
        `Incomming -> Method:[${req.method}]-Url:[${req.url}]- IP:[${req.socket.remoteAddress}]- Status : [${res.statusCode}]`,
      );
    });
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: ['http://localhost:1337', 'http://localhost:3000'],
    }),
  );

  app.use([userRouter, petRouter, login, reqRouter]);
  // handle undefined routes
  app.use((req, res) => {
    const error = new Error('Route not found');
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });
  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`),
    );
};
mongoose.set({ strictQuery: false });
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('connected to mongoDB.');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect');
    Logging.error(error);
  });
