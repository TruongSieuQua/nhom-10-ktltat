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
import { Model, QueryOptions, Document } from 'mongoose';
export declare class BaseRepository<T extends Document> {
    private readonly model;
    constructor(model: Model<T>);
    create(doc: any): Promise<any>;
    findById(id: string, option?: QueryOptions): Promise<T>;
    findByCondition(filter: any, field?: any | null, option?: any | null, populate?: any | null): Promise<T>;
    getByCondition(filter: any, field?: any | null, option?: any | null, populate?: any | null): Promise<T[]>;
    countDocuments(filter: any): Promise<number>;
    findAll(): Promise<T[]>;
    aggregate(option: any): Promise<any[]>;
    populate(result: T[], option: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>[]>;
    deleteOne(id: string): Promise<import("mongodb").DeleteResult>;
    deleteMany(id: string[]): Promise<import("mongodb").DeleteResult>;
    deleteByCondition(filter: any): Promise<import("mongodb").DeleteResult>;
    findByConditionAndUpdate(filter: any, update: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>>;
    updateMany(filter: any, update: any, option?: any | null, callback?: any | null): Promise<import("mongodb").UpdateResult>;
    findByIdAndUpdate(id: any, update: any, populate?: any | null): Promise<import("mongoose").UnpackedIntersection<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & Omit<import("mongoose").Require_id<T>, never>>, {}>>;
}
