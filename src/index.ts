import 'reflect-metadata';
import { app } from './app';
import { AppDataSource } from './data-source';
import { connectProducer, disconnectProducer } from './kafka/producer';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully.');

    await connectProducer();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log('Shutting down server...');
      server.close();
      await disconnectProducer();
      await AppDataSource.destroy();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
