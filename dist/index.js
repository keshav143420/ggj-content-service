"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const data_source_1 = require("./data-source");
const producer_1 = require("./kafka/producer");
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Database connected successfully.');
        await (0, producer_1.connectProducer)();
        const server = app_1.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        const shutdown = async () => {
            console.log('Shutting down server...');
            server.close();
            await (0, producer_1.disconnectProducer)();
            await data_source_1.AppDataSource.destroy();
            process.exit(0);
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map