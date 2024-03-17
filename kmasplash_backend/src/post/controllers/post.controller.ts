import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from '../dto/post.dto';
import { PostServices } from '../services/post.service';
import { PostPaginationDto } from './../dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostServices) {}

  @Get()
  getAllPost(@Query() { page, limit, category }: PostPaginationDto) {
    return this.postService.getAll({
      page,
      limit,
      category,
    });
  }

  @Get('/search')
  getPostBySearch(@Query() { page, limit, keyword }: PostPaginationDto) {
    return this.postService.getPostBySearch(keyword, page, limit);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPost(@Req() req: any, @Body() post: PostDto) {
    return this.postService.createPost(req.user, post);
  }
  @Get('/user/:userId')
  getPostByUserId(
    @Param('userId') userId: string,
    @Query() { page, limit }: PostPaginationDto,
  ) {
    return this.postService.getPostByUserId(userId, page, limit);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/all')
  async getPostUser(@Req() req: any) {
    await req.user.populate('posts');
    return req.user.posts;
  }
  @Get('get/category')
  async getByCategory(@Query('categoryId') categoryId: string) {
    return await this.postService.getByCategory(categoryId);
  }
  @Get('get/categories')
  async getByCategories(@Query('categoryIds') categoryIds) {
    return await this.postService.getByCategories(categoryIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  async deletePostById(@Param('postId') postId: string, @Req() req: any) {
    return this.postService.deletePost(postId, req.user._id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:postId')
  async updatePost(
    @Param('postId') postId: string,
    @Req() req: any,
    @Body() post: PostDto,
  ) {
    return this.postService.updatePost(postId, req.user._id, post);
  }

  @Post('/:postId/like')
  @UseGuards(AuthGuard('jwt'))
  async likePost(@Param('postId') postId, @Req() req: any) {
    return this.postService.likePost(postId, req.user._id);
  }
}
