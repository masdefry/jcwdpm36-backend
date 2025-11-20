import express, { Express, NextFunction, Request, Response } from 'express';
import authRouter from './routers/auth.router';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
app.use(express.json());
const port = 5000;

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
