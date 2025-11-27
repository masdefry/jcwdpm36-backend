import express, { Express, NextFunction, Request, Response } from 'express';
import authRouter from './routers/auth.router';
import cityRouter from './routers/city.router';
import routeRouter from './routers/route.router';
import vehicleRouter from './routers/vehicle.router';
import dotenv from 'dotenv';
import { corsOptions } from './middlewares/cors.options.middleware';
dotenv.config();

const app: Express = express();
const port = 5000;
app.use('/images', express.static('src/uploads'));
app.use(corsOptions);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/cities', cityRouter);
app.use('/api/routes', routeRouter);
app.use('/api/vehicles', vehicleRouter);
/*
  Middleware (Application Level)
*/
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  const message = err?.isOperational
    ? err?.message
    : err.message === 'File too large'
    ? err.message
    : 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
