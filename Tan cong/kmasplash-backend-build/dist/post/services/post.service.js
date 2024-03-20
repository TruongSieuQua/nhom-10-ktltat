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
exports.PostServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const category_repositories_1 = require("../repository/category.repositories");
const post_repositories_1 = require("./../repository/post.repositories");
let PostServices = class PostServices {
    constructor(postRepository, categoryRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }
    async getAll({ page, limit, category, }) {
        if (!page && !limit && !category) {
            return await this.postRepository.getByCondition({});
        }
        if (category) {
            const _category = await this.categoryRepository.getByCondition({
                value: category,
            }, {
                posts: 0,
            });
            const count = await this.postRepository.countDocuments({});
            const totalPage = (count / limit).toFixed();
            const posts = await this.postRepository.getByCondition({}, null, {
                skip: (+page - 1) * +limit,
                limit: +limit,
            }, [
                { path: 'user', select: '-password' },
                { path: 'categories', select: 'value' },
                {
                    path: 'comments',
                    select: 'comment  createdAt',
                    populate: { path: 'user', select: 'fullName avatar' },
                },
            ]);
            return {
                posts,
                totalPage,
            };
        }
        const count = await this.postRepository.countDocuments({});
        const totalPage = (count / limit).toFixed();
        const posts = await this.postRepository.getByCondition({}, null, {
            skip: (+page - 1) * +limit,
            limit: +limit,
        }, [
            { path: 'user', select: '-password' },
            { path: 'categories', select: 'value' },
            {
                path: 'comments',
                select: 'comment  createdAt',
                populate: { path: 'user', select: 'fullName avatar' },
            },
        ]);
        return {
            posts,
            totalPage,
        };
    }
    async createPost(user, post) {
        post.user = user;
        const newPost = await this.postRepository.create(post);
        if (post.categories) {
            await this.categoryRepository.updateMany({
                _id: { $in: post.categories },
            }, {
                $push: {
                    post: newPost._id,
                },
            });
        }
        return newPost.save();
    }
    async getByCategory(category_id) {
        return await this.postRepository.getByCondition({
            categories: {
                $elemMatch: { $eq: category_id },
            },
        });
    }
    async getByCategories(category_ids) {
        return await this.postRepository.getByCondition({
            categories: {
                $all: category_ids,
            },
        });
    }
    async getPostByUserId(user_id, page, limit) {
        if (!(0, mongoose_1.isValidObjectId)(user_id)) {
            throw new common_1.HttpException(' User Id not valid', common_1.HttpStatus.BAD_REQUEST);
        }
        const count = await this.postRepository.countDocuments({
            user: {
                _id: user_id,
            },
        });
        const totalPage = (count / limit).toFixed();
        const posts = await this.postRepository.getByCondition({
            user: {
                _id: user_id,
            },
        }, null, {
            skip: (+page - 1) * +limit,
            limit: +limit,
        }, [
            { path: 'user', select: '-password' },
            { path: 'categories', select: 'value' },
            {
                path: 'comments',
                select: 'comment  createdAt',
                populate: { path: 'user', select: 'fullName avatar' },
            },
        ]);
        return {
            posts,
            totalPage,
        };
    }
    async getPostBySearch(keyword, page, limit) {
        if (!page && !limit && !keyword) {
            return await this.postRepository.getByCondition({});
        }
        const count = await this.postRepository.countDocuments({
            title: { $regex: '.*' + keyword + '.*', $options: 'i' },
        });
        const totalPage = (count / limit).toFixed();
        const posts = await this.postRepository.getByCondition({
            title: { $regex: '.*' + keyword + '.*', $options: 'i' },
        }, null, {
            skip: (+page - 1) * +limit,
            limit: +limit,
        }, [
            { path: 'user', select: '-password' },
            { path: 'categories', select: 'value' },
            {
                path: 'comments',
                select: 'comment  createdAt',
                populate: { path: 'user', select: 'fullName avatar' },
            },
        ]);
        return {
            posts,
            totalPage,
        };
    }
    async getPostById(id) {
        const post = await this.postRepository.findById(id);
        if (post) {
            await post.populate([
                { path: 'user', select: '-password' },
                { path: 'categories', select: 'value' },
                {
                    path: 'comments',
                    select: 'comment  createdAt',
                    populate: { path: 'user', select: 'fullName avatar' },
                },
            ]);
            return post;
        }
        else {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deletePost(postId, userId) {
        const post = await this.getPostById(postId);
        const curPost = await this.getPostById(postId);
        if (curPost.user._id.toString() !== userId.toString()) {
            throw new common_1.HttpException('Permission Dennied', common_1.HttpStatus.BAD_REQUEST);
        }
        const deletedPost = await this.postRepository.deleteOne(postId);
        return {
            status: common_1.HttpStatus.ACCEPTED,
            postId: postId,
        };
    }
    async updatePost(postId, userId, post) {
        const curPost = await this.getPostById(postId);
        if (curPost.user._id.toString() !== userId.toString()) {
            throw new common_1.HttpException('Permission Dennied', common_1.HttpStatus.BAD_REQUEST);
        }
        const updatePost = await this.postRepository.findByIdAndUpdate(postId, post);
        return updatePost;
    }
    async likePost(postId, userId) {
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new common_1.HttpException('Post Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await post.populate([
            { path: 'user', select: '-password' },
            { path: 'categories', select: 'value' },
        ]);
        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            const postLikes = post.likes.filter((like) => like.toString() !== userId.toString());
            post.likes = postLikes;
            const updatedPost = await this.postRepository.findByIdAndUpdate(postId, post);
            return updatedPost;
        }
        else {
            post.likes.push(userId);
            const updatedPost = await this.postRepository.findByIdAndUpdate(postId, post);
            return updatedPost;
        }
    }
    async comment(postId, userId) {
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new common_1.HttpException('Post Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
PostServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repositories_1.PostRepository,
        category_repositories_1.CategoryRepository])
], PostServices);
exports.PostServices = PostServices;
//# sourceMappingURL=post.service.js.map