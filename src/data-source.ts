import { DataSource } from 'typeorm';
import { Post } from './entities/Post';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'content_db',
  synchronize: true, // Use carefully in production!
  logging: false,
  entities: [Post],
  subscribers: [],
  migrations: [],
});
