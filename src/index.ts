import express, { Express, Request, Response } from 'express';
import postRoutes from './routes/post.routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Content Service is running on port ${port}`);
});

export default app;
