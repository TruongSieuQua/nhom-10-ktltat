import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Category } from '../models/category.model';
export declare class CategoryRepository extends BaseRepository<Category> {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
}
