import { IUser } from './../models/user.model';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
export declare class UserRepository extends BaseRepository<IUser> {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
}
