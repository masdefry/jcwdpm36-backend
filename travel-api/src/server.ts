import express, { Express, NextFunction, Request, Response } from 'express';
import authRouter from './routers/auth.router';
import dotenv from 'dotenv';
import cors from 'cors';
import { WHITELIST } from './config/index.config';
dotenv.config();

const app: Express = express();
const port = 5000;
app.use(
  cors({
    origin(requestOrigin, callback) {
      if (WHITELIST.indexOf(requestOrigin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(express.json());
app.use('/api/auth', authRouter);
/*
  Middleware (Application Level)
*/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong!',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
