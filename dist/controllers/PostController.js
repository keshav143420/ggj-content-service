"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const PostService_1 = require("../services/PostService");
const postService = new PostService_1.PostService();
class PostController {
    async createPost(req, res) {
        try {
            const { title, content, author } = req.body;
            if (!title || !content) {
                res.status(400).json({ error: 'Title and content are required' });
                return;
            }
            const newPost = await postService.createPost(title, content, author);
            res.status(201).json(newPost);
        }
        catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(posts);
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getPostById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid post ID' });
                return;
            }
            const post = await postService.getPostById(id);
            if (!post) {
                res.status(404).json({ error: 'Post not found' });
                return;
            }
            res.status(200).json(post);
        }
        catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map