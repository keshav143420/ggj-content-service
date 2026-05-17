import { Router } from 'express';
import { PostController } from '../controllers/PostController';

const router = Router();
const postController = new PostController();

router.post('/', (req, res) => postController.createPost(req, res));
router.get('/', (req, res) => postController.getAllPosts(req, res));
router.get('/:id', (req, res) => postController.getPostById(req, res));

export { router as postRoutes };
