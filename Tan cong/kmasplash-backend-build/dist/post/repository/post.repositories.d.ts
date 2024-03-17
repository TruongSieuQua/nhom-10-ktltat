import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { IPost } from '../models/post.model';
export declare class PostRepository extends BaseRepository<IPost> {
    private readonly postModel;
    constructor(postModel: Model<IPost>);
}
