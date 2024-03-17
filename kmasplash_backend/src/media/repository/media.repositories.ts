import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Media } from '../model/media.model';

export class MediaRepository extends BaseRepository<Media> {
  constructor(
    @InjectModel('Media')
    private readonly MediaModel: Model<Media>,
  ) {
    super(MediaModel);
  }
}
