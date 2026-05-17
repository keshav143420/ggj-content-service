import express from 'express';
import { postRoutes } from './routes/postRoutes';

export const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
