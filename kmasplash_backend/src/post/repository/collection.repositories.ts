import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Collection } from '../models/collection.model';

export class CollectionRepository extends BaseRepository<Collection> {
  constructor(
    @InjectModel('Collection')
    private readonly collectionModel: Model<Collection>,
  ) {
    super(collectionModel);
  }
}
