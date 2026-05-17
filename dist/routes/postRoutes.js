"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const router = (0, express_1.Router)();
exports.postRoutes = router;
const postController = new PostController_1.PostController();
router.post('/', (req, res) => postController.createPost(req, res));
router.get('/', (req, res) => postController.getAllPosts(req, res));
router.get('/:id', (req, res) => postController.getPostById(req, res));
//# sourceMappingURL=postRoutes.js.map