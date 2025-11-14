import express, { Express, Request, Response } from 'express';
import productsRouter from './routers/products.router';
import actorsRouter from './routers/actors.router';

const app: Express = express();
app.use(express.json());
const port = 5001;

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Express API Server',
  });
});

app.use('/api/products', productsRouter);
app.use('/api/actors', actorsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
