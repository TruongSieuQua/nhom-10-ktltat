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
/// <reference types="mongoose/types/inferschematype" />
import { Document, Schema } from 'mongoose';
import { Comment } from 'src/post/models/comment.model';
import { IUser } from 'src/users/models/user.model';
import { Category } from './category.model';
declare const PostSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
    toJSON: {
        virtuals: true;
    };
    collection: string;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comments: import("mongoose").Types.ObjectId[];
    categories: import("mongoose").Types.ObjectId[];
    likes: import("mongoose").Types.ObjectId[];
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    fileName?: string;
    title?: string;
    URL?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comments: import("mongoose").Types.ObjectId[];
    categories: import("mongoose").Types.ObjectId[];
    likes: import("mongoose").Types.ObjectId[];
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    fileName?: string;
    title?: string;
    URL?: string;
}>> & Omit<import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    comments: import("mongoose").Types.ObjectId[];
    categories: import("mongoose").Types.ObjectId[];
    likes: import("mongoose").Types.ObjectId[];
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    fileName?: string;
    title?: string;
    URL?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
export { PostSchema };
export interface IPost extends Document {
    fileName?: string;
    description: string;
    user: IUser;
    categories: [Category];
    URL?: string;
    title: string;
    likes: string[];
    comments: Comment[];
}
