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
import { CreateUserDto, LoginDto, UpdateUserDto } from '../dto/user.base.dto';
import { UserRepository } from '../repository/user.repositories';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(userDto: CreateUserDto): Promise<any>;
    findUserById(id: string): Promise<import("../models/user.model").IUser>;
    findByEmail(email: any): Promise<import("../models/user.model").IUser>;
    update(filter: any, update: any): Promise<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser> & Omit<import("../models/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findByLogin({ email, password }: LoginDto): Promise<import("../models/user.model").IUser>;
    getUserByRefresh(refresh_token: any, email: any): Promise<import("../models/user.model").IUser>;
    updateProfile(body: UpdateUserDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser> & Omit<import("../models/user.model").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    private reverse;
}
