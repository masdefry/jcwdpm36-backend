import express, { Express, NextFunction, Request, Response } from 'express';
import authRouter from './routers/auth.router';
import cityRouter from './routers/city.router';
import dotenv from 'dotenv';
import { corsOptions } from './middlewares/cors.options.middleware';
dotenv.config();

const app: Express = express();
const port = 5000;
// app.use(corsOptions);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/cities', cityRouter);
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
