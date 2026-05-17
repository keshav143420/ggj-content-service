import { AppDataSource } from '../data-source';
import { Post } from '../entities/Post';
import { emitPostCreatedEvent } from '../kafka/producer';

export class PostService {
  private postRepository = AppDataSource.getRepository(Post);

  async createPost(title: string, content: string, author?: string): Promise<Post> {
    const postData: Partial<Post> = { title, content };
    if (author !== undefined) {
      postData.author = author;
    }
    const post = this.postRepository.create(postData);
    await this.postRepository.save(post);
    
    // Emit event asynchronously
    emitPostCreatedEvent(post).catch(err => console.error('Failed to emit event', err));
    
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getPostById(id: number): Promise<Post | null> {
    return await this.postRepository.findOne({ where: { id } });
  }
}
