/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { IUser } from 'src/users/models/user.model';
import { PostDto } from '../dto/post.dto';
import { CategoryRepository } from '../repository/category.repositories';
import { PostRepository } from './../repository/post.repositories';
export declare class PostServices {
    private readonly postRepository;
    private readonly categoryRepository;
    constructor(postRepository: PostRepository, categoryRepository: CategoryRepository);
    getAll({ page, limit, category, }: {
        page?: number;
        limit?: number;
        category?: string;
    }): Promise<import("../models/post.model").IPost[] | {
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    createPost(user: IUser, post: PostDto): Promise<any>;
    getByCategory(category_id: string): Promise<import("../models/post.model").IPost[]>;
    getByCategories(category_ids: [string]): Promise<import("../models/post.model").IPost[]>;
    getPostByUserId(user_id: string, page?: number, limit?: number): Promise<{
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    getPostBySearch(keyword: string, page: number, limit: number): Promise<import("../models/post.model").IPost[] | {
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    getPostById(id: string): Promise<import("../models/post.model").IPost>;
    deletePost(postId: string, userId: string): Promise<{
        status: HttpStatus;
        postId: string;
    }>;
    updatePost(postId: string, userId: string, post: PostDto): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").IPost> & Omit<import("../models/post.model").IPost & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    likePost(postId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").IPost> & Omit<import("../models/post.model").IPost & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    comment(postId: string, userId: string): Promise<void>;
}
