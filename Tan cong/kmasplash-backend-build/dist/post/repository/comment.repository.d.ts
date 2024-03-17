import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Comment } from '../models/comment.model';
export declare class CommentRepository extends BaseRepository<Comment> {
    private readonly commentModel;
    constructor(commentModel: Model<Comment>);
}
