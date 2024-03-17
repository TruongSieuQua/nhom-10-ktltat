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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const post_dto_1 = require("../dto/post.dto");
const post_service_1 = require("../services/post.service");
const post_dto_2 = require("./../dto/post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getAllPost({ page, limit, category }) {
        return this.postService.getAll({
            page,
            limit,
            category,
        });
    }
    getPostBySearch({ page, limit, keyword }) {
        return this.postService.getPostBySearch(keyword, page, limit);
    }
    getPostById(id) {
        return this.postService.getPostById(id);
    }
    createPost(req, post) {
        return this.postService.createPost(req.user, post);
    }
    getPostByUserId(userId, { page, limit }) {
        return this.postService.getPostByUserId(userId, page, limit);
    }
    async getPostUser(req) {
        await req.user.populate('posts');
        return req.user.posts;
    }
    async getByCategory(categoryId) {
        return await this.postService.getByCategory(categoryId);
    }
    async getByCategories(categoryIds) {
        return await this.postService.getByCategories(categoryIds);
    }
    async deletePostById(postId, req) {
        return this.postService.deletePost(postId, req.user._id);
    }
    async updatePost(postId, req, post) {
        return this.postService.updatePost(postId, req.user._id, post);
    }
    async likePost(postId, req) {
        return this.postService.likePost(postId, req.user._id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_2.PostPaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPost", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_2.PostPaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostBySearch", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.PostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_dto_2.PostPaginationDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostByUserId", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('user/all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostUser", null);
__decorate([
    (0, common_1.Get)('get/category'),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)('get/categories'),
    __param(0, (0, common_1.Query)('categoryIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getByCategories", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePostById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, post_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Post)('/:postId/like'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostServices])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map