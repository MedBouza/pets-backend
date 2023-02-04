import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import userRouter from './routes/userRouter';
import petRouter from './routes/petRouter';
import login from './routes/authRouter';

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
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content-Type,Accept,Authorization',
    );
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
    }
    next();
  });
  app.use([userRouter, petRouter, login]);
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
