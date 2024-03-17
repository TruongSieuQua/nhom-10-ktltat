import { PostRepository } from './../repository/post.repositories';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repositories';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostRepository,
  ) {}
  async getAll() {
    return await this.categoryRepository.getByCondition(
      {},
      {
        posts: 0,
      },
    );
  }
  async create(createCategoryDto: CategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }
  async getPosts(categoryId) {
    return await this.postRepository.getByCondition({
      categories: { $elemMatch: { $eq: categoryId } },
    });
  }
}
