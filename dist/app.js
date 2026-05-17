"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const postRoutes_1 = require("./routes/postRoutes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use('/api/posts', postRoutes_1.postRoutes);
exports.app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
//# sourceMappingURL=app.js.map