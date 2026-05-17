"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const data_source_1 = require("../data-source");
const Post_1 = require("../entities/Post");
const producer_1 = require("../kafka/producer");
class PostService {
    postRepository = data_source_1.AppDataSource.getRepository(Post_1.Post);
    async createPost(title, content, author) {
        const postData = { title, content };
        if (author !== undefined) {
            postData.author = author;
        }
        const post = this.postRepository.create(postData);
        await this.postRepository.save(post);
        // Emit event asynchronously
        (0, producer_1.emitPostCreatedEvent)(post).catch(err => console.error('Failed to emit event', err));
        return post;
    }
    async getAllPosts() {
        return await this.postRepository.find({ order: { createdAt: 'DESC' } });
    }
    async getPostById(id) {
        return await this.postRepository.findOne({ where: { id } });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map