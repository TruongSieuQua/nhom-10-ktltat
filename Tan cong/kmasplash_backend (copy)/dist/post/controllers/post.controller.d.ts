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
import { PostDto } from '../dto/post.dto';
import { PostServices } from '../services/post.service';
import { PostPaginationDto } from './../dto/post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostServices);
    getAllPost({ page, limit, category }: PostPaginationDto): Promise<import("../models/post.model").IPost[] | {
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    getPostBySearch({ page, limit, keyword }: PostPaginationDto): Promise<import("../models/post.model").IPost[] | {
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    getPostById(id: string): Promise<import("../models/post.model").IPost>;
    createPost(req: any, post: PostDto): Promise<any>;
    getPostByUserId(userId: string, { page, limit }: PostPaginationDto): Promise<{
        posts: import("../models/post.model").IPost[];
        totalPage: string;
    }>;
    getPostUser(req: any): Promise<any>;
    getByCategory(categoryId: string): Promise<import("../models/post.model").IPost[]>;
    getByCategories(categoryIds: any): Promise<import("../models/post.model").IPost[]>;
    deletePostById(postId: string, req: any): Promise<{
        status: import("@nestjs/common").HttpStatus;
        postId: string;
    }>;
    updatePost(postId: string, req: any, post: PostDto): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").IPost> & Omit<import("../models/post.model").IPost & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    likePost(postId: any, req: any): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").IPost> & Omit<import("../models/post.model").IPost & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
