import { Post, CreatePostDto } from '../types/post';

export class PostService {
  private posts: Post[] = [];

  public getAllPosts(): Post[] {
    return this.posts;
  }

  public getPostById(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  public createPost(data: CreatePostDto): Post {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      content: data.content,
      createdAt: new Date(),
    };
    
    this.posts.push(newPost);
    return newPost;
  }
}

export const postService = new PostService();
