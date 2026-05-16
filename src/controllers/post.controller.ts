import { Request, Response } from 'express';
import { postService } from '../services/post.service';
import { CreatePostDto } from '../types/post';

export class PostController {
  public getAllPosts(req: Request, res: Response): void {
    const posts = postService.getAllPosts();
    res.status(200).json({ success: true, data: posts });
  }

  public getPostById(req: Request, res: Response): void {
    const { id } = req.params;
    const post = postService.getPostById(id as string);
    
    if (!post) {
      res.status(404).json({ success: false, message: 'Post not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: post });
  }

  public createPost(req: Request, res: Response): void {
    const { title, content } = req.body as CreatePostDto;
    
    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and content are required' });
      return;
    }
    
    const newPost = postService.createPost({ title, content });
    res.status(201).json({ success: true, data: newPost });
  }
}

export const postController = new PostController();
