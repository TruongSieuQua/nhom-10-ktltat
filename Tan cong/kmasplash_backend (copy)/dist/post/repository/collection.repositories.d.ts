import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Collection } from '../models/collection.model';
export declare class CollectionRepository extends BaseRepository<Collection> {
    private readonly collectionModel;
    constructor(collectionModel: Model<Collection>);
}
