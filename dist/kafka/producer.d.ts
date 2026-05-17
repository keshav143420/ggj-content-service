import { Producer } from 'kafkajs';
export declare const producer: Producer;
export declare const connectProducer: () => Promise<void>;
export declare const disconnectProducer: () => Promise<void>;
export declare const emitPostCreatedEvent: (post: any) => Promise<void>;
//# sourceMappingURL=producer.d.ts.map