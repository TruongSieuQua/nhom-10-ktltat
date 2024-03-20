import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/user.module';
import { CategoryController } from './controllers/category.controller';
import { CollectionController } from './controllers/collection.controller';
import { CommentController } from './controllers/comment.controller';
import { PostController } from './controllers/post.controller';
import { CategorySchema } from './models/category.model';
import { CollectionSchema } from './models/collection.model';
import { CommentSchema } from './models/comment.model';
import { PostSchema } from './models/post.model';
import { CategoryRepository } from './repository/category.repositories';
import { CollectionRepository } from './repository/collection.repositories';
import { CommentRepository } from './repository/comment.repository';
import { PostRepository } from './repository/post.repositories';
import { CategoryService } from './services/category.service';
import { CollectionService } from './services/collection.service';
import { CommentService } from './services/comment.service';
import { PostServices } from './services/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'Collection',
        schema: CollectionSchema,
      },
      {
        name: 'Comment',
        schema: CommentSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [
    PostController,
    CategoryController,
    CollectionController,
    CommentController,
  ],
  providers: [
    PostServices,
    PostRepository,
    CategoryService,
    CategoryRepository,
    CollectionRepository,
    CollectionService,
    CommentService,
    CommentRepository,
  ],
})
export class PostModule {}
