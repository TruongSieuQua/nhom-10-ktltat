import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Category } from '../models/category.model';

export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
