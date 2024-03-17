"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const post_repositories_1 = require("../repository/post.repositories");
const comment_repository_1 = require("../repository/comment.repository");
let CommentService = class CommentService {
    constructor(commentRepository, postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }
    async createComment(postId, comment, user) {
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new common_1.HttpException('Post Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        comment.user = user;
        const newComment = await this.commentRepository.create(comment);
        post.comments.unshift(newComment);
        return await this.postRepository.findByIdAndUpdate(postId, post, [
            { path: 'user', select: '-password' },
            { path: 'categories', select: 'value' },
            {
                path: 'comments',
                select: 'comment  createdAt',
                populate: { path: 'user', select: 'fullName avatar' },
            },
        ]);
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_repository_1.CommentRepository,
        post_repositories_1.PostRepository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map