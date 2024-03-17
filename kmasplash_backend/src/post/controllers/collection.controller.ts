import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CollectionDto } from '../dto/collection.dto';
import { CollectionService } from '../services/collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async getAllCategories() {
    return await this.collectionService.getAll();
  }
  @Post()
  async createCategory(@Body() createCategoryDto: CollectionDto) {
    return await this.collectionService.create(createCategoryDto);
  }

  @Get(':id/posts')
  async getAllPostsOf(@Param('id') category_id) {
    return await this.collectionService.getPosts(category_id);
  }
}
