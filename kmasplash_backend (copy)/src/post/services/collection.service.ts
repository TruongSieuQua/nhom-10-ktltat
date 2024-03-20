import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/post/repository/post.repositories';
import { CollectionDto } from '../dto/collection.dto';
import { CollectionRepository } from '../repository/collection.repositories';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collection: CollectionRepository,
    private readonly postRepository: PostRepository,
  ) {}
  async getAll() {
    return await this.collection.getByCondition({});
  }
  async create(createCategoryDto: CollectionDto) {
    return await this.collection.create(createCategoryDto);
  }
  async getPosts(categoryId) {
    return await this.postRepository.getByCondition({
      categories: { $elemMatch: { $eq: categoryId } },
    });
  }
}
