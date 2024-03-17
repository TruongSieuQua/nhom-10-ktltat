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
import { PostRepository } from 'src/post/repository/post.repositories';
import { IUser } from 'src/users/models/user.model';
import { CommentDto } from '../dto/comment.dto';
import { CommentRepository } from '../repository/comment.repository';
export declare class CommentService {
    private readonly commentRepository;
    private readonly postRepository;
    constructor(commentRepository: CommentRepository, postRepository: PostRepository);
    createComment(postId: string, comment: CommentDto, user: IUser): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").IPost> & Omit<import("../models/post.model").IPost & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
