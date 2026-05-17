import { Kafka, Producer } from 'kafkajs';
import * as dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'content-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const producer: Producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer connected');
  } catch (error) {
    console.error('Error connecting Kafka Producer:', error);
  }
};

export const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka Producer disconnected');
  } catch (error) {
    console.error('Error disconnecting Kafka Producer:', error);
  }
};

export const emitPostCreatedEvent = async (post: any) => {
  try {
    await producer.send({
      topic: 'post-created',
      messages: [
        { value: JSON.stringify(post) },
      ],
    });
    console.log('Emitted post-created event for post:', post.id);
  } catch (error) {
    console.error('Error emitting post-created event:', error);
  }
};
