"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitPostCreatedEvent = exports.disconnectProducer = exports.connectProducer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const kafka = new kafkajs_1.Kafka({
    clientId: 'content-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
exports.producer = kafka.producer();
const connectProducer = async () => {
    try {
        await exports.producer.connect();
        console.log('Kafka Producer connected');
    }
    catch (error) {
        console.error('Error connecting Kafka Producer:', error);
    }
};
exports.connectProducer = connectProducer;
const disconnectProducer = async () => {
    try {
        await exports.producer.disconnect();
        console.log('Kafka Producer disconnected');
    }
    catch (error) {
        console.error('Error disconnecting Kafka Producer:', error);
    }
};
exports.disconnectProducer = disconnectProducer;
const emitPostCreatedEvent = async (post) => {
    try {
        await exports.producer.send({
            topic: 'post-created',
            messages: [
                { value: JSON.stringify(post) },
            ],
        });
        console.log('Emitted post-created event for post:', post.id);
    }
    catch (error) {
        console.error('Error emitting post-created event:', error);
    }
};
exports.emitPostCreatedEvent = emitPostCreatedEvent;
//# sourceMappingURL=producer.js.map