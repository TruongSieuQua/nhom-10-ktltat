import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { IPost } from '../models/post.model';

export class PostRepository extends BaseRepository<IPost> {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<IPost>,
  ) {
    super(postModel);
  }
}
