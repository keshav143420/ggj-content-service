import { PostService } from '../services/PostService';
import { AppDataSource } from '../data-source';
import { Post } from '../entities/Post';
import { emitPostCreatedEvent } from '../kafka/producer';

// Mock dependencies
jest.mock('../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock('../kafka/producer', () => ({
  emitPostCreatedEvent: jest.fn().mockResolvedValue(undefined),
}));

describe('PostService', () => {
  let postService: PostService;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    // Need to re-instantiate because repository is assigned on class creation
    postService = new PostService();
    
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a post, save it, and emit an event', async () => {
      const title = 'Test Title';
      const content = 'Test Content';
      const author = 'Test Author';
      const mockPost = new Post();
      mockPost.id = 1;
      mockPost.title = title;
      mockPost.content = content;
      mockPost.author = author;

      mockRepository.create.mockReturnValue(mockPost);
      mockRepository.save.mockResolvedValue(mockPost);

      const result = await postService.createPost(title, content, author);

      expect(mockRepository.create).toHaveBeenCalledWith({ title, content, author });
      expect(mockRepository.save).toHaveBeenCalledWith(mockPost);
      expect(emitPostCreatedEvent).toHaveBeenCalledWith(mockPost);
      expect(result).toEqual(mockPost);
    });
  });

  describe('getAllPosts', () => {
    it('should retrieve all posts ordered by creation date descending', async () => {
      const mockPosts = [new Post(), new Post()];
      mockRepository.find.mockResolvedValue(mockPosts);

      const result = await postService.getAllPosts();

      expect(mockRepository.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getPostById', () => {
    it('should retrieve a post by id', async () => {
      const mockPost = new Post();
      mockPost.id = 1;
      mockRepository.findOne.mockResolvedValue(mockPost);

      const result = await postService.getPostById(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockPost);
    });

    it('should return null if post not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await postService.getPostById(999);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(result).toBeNull();
    });
  });
});
