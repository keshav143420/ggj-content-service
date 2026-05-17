import { Post } from '../entities/Post';
export declare class PostService {
    private postRepository;
    createPost(title: string, content: string, author?: string): Promise<Post>;
    getAllPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
}
//# sourceMappingURL=PostService.d.ts.map