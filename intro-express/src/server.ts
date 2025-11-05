import express, { Express, Request, Response } from 'express';
import fs from 'fs'; // fs: file system, digunakan untuk read file, ataupun write file

const app: Express = express();
app.use(express.json());
const port = 5001;

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Express API Server',
  });
});

app.get('/api/products', (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync('./src/json/products.json', 'utf-8');
    const products = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: 'Get products successfull',
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/products', (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) throw new Error('Name or price is required');

    // Step-01  : Read current products
    const data = fs.readFileSync('./src/json/products.json', 'utf-8');
    const products = JSON.parse(data); // Convert from JSON to object JS

    const newId = products[products?.length - 1]?.id + 1;
    products?.push({ id: newId, name, price });

    fs.writeFileSync('./src/json/products.json', JSON.stringify(products));

    res.status(201).json({
      success: true,
      message: 'Create product successfull',
      data: {
        name,
        price,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message,
    });
  }
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params; // String

    const data = fs.readFileSync('./src/json/products.json', 'utf-8');
    const products = JSON.parse(data);

    const filteredProducts = products?.filter(
      (product: any) => product?.id != id
    );

    fs.writeFileSync(
      './src/json/products.json',
      JSON.stringify(filteredProducts)
    );

    res.status(200).json({
      success: true,
      message: `Delete product with id = ${id} successfull`,
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message,
    });
  }
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const data = fs.readFileSync('./src/json/products.json', 'utf-8');
    const products = JSON.parse(data);

    const findIndexProduct = products?.findIndex(
      (product: any) => product?.id == id
    );

    if (findIndexProduct === -1)
      throw new Error(`Product with id = ${id} not found`);

    products[findIndexProduct] = { ...products[findIndexProduct], name, price }; // { currentId, name, price }

    fs.writeFileSync('./src/json/products.json', JSON.stringify(products));

    res.status(200).json({
      success: true,
      message: `Update product with id = ${id} successfull`,
      data: {
        name,
        price,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message,
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
