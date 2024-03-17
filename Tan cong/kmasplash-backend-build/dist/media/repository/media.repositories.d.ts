import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Media } from '../model/media.model';
export declare class MediaRepository extends BaseRepository<Media> {
    private readonly MediaModel;
    constructor(MediaModel: Model<Media>);
}
