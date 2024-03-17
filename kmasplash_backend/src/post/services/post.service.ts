import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IUser } from 'src/users/models/user.model';
import { PostDto } from '../dto/post.dto';
import { CategoryRepository } from '../repository/category.repositories';
import { PostRepository } from './../repository/post.repositories';

@Injectable()
export class PostServices {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async getAll({
    page,
    limit,
    category,
  }: {
    page?: number;
    limit?: number;
    category?: string;
  }) {
    if (!page && !limit && !category) {
      return await this.postRepository.getByCondition({});
    }
    if (category) {
      const _category = await this.categoryRepository.getByCondition(
        {
          value: category,
        },
        {
          posts: 0,
        },
      );
      const count = await this.postRepository.countDocuments({
        categories: _category[0]._id,
      });
      const totalPage = (count / limit).toFixed();
      const posts = await this.postRepository.getByCondition(
        {
          categories: _category[0]._id,
        },
        null,
        {
          skip: (+page - 1) * +limit,
          limit: +limit,
        },
        [
          { path: 'user', select: '-password' },
          { path: 'categories', select: 'value' },
          {
            path: 'comments',
            select: 'comment  createdAt',
            populate: { path: 'user', select: 'fullName avatar' },
          },
        ],
      );
      return {
        posts,
        totalPage,
      };
    }
    const count = await this.postRepository.countDocuments({});
    const totalPage = (count / limit).toFixed();
    const posts = await this.postRepository.getByCondition(
      {},
      null,
      {
        skip: (+page - 1) * +limit,
        limit: +limit,
      },
      [
        { path: 'user', select: '-password' },
        { path: 'categories', select: 'value' },
        {
          path: 'comments',
          select: 'comment  createdAt',
          populate: { path: 'user', select: 'fullName avatar' },
        },
      ],
    );

    return {
      posts,
      totalPage,
    };
  }
  async createPost(user: IUser, post: PostDto) {
    post.user = user;
    const newPost = await this.postRepository.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: {
            post: newPost._id,
          },
        },
      );
    }
    return newPost.save();
  }
  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }
  async getPostByUserId(user_id: string, page?: number, limit?: number) {
    if (!isValidObjectId(user_id)) {
      throw new HttpException(' User Id not valid', HttpStatus.BAD_REQUEST);
    }

    const count = await this.postRepository.countDocuments({
      user: {
        _id: user_id,
      },
    });

    const totalPage = (count / limit).toFixed();
    const posts = await this.postRepository.getByCondition(
      {
        user: {
          _id: user_id,
        },
      },
      null,
      {
        skip: (+page - 1) * +limit,
        limit: +limit,
      },
      [
        { path: 'user', select: '-password' },
        { path: 'categories', select: 'value' },
        {
          path: 'comments',
          select: 'comment  createdAt',
          populate: { path: 'user', select: 'fullName avatar' },
        },
      ],
    );
    return {
      posts,
      totalPage,
    };
  }
  async getPostBySearch(keyword: string, page: number, limit: number) {
    if (!page && !limit && !keyword) {
      return await this.postRepository.getByCondition({});
    }

    const count = await this.postRepository.countDocuments({
      title: { $regex: '.*' + keyword + '.*', $options: 'i' },
    });
    const totalPage = (count / limit).toFixed();
    const posts = await this.postRepository.getByCondition(
      {
        title: { $regex: '.*' + keyword + '.*', $options: 'i' },
      },
      null,
      {
        skip: (+page - 1) * +limit,
        limit: +limit,
      },
      [
        { path: 'user', select: '-password' },
        { path: 'categories', select: 'value' },
        {
          path: 'comments',
          select: 'comment  createdAt',
          populate: { path: 'user', select: 'fullName avatar' },
        },
      ],
    );

    return {
      posts,
      totalPage,
    };
  }
  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);

    if (post) {
      await post.populate([
        { path: 'user', select: '-password' },
        { path: 'categories', select: 'value' },
        {
          path: 'comments',
          select: 'comment  createdAt',
          populate: { path: 'user', select: 'fullName avatar' },
        },
      ]);
      return post;
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
  async deletePost(postId: string, userId: string) {
    const post = await this.getPostById(postId);
    const curPost = await this.getPostById(postId);

    if (curPost.user._id.toString() !== userId.toString()) {
      throw new HttpException('Permission Dennied', HttpStatus.BAD_REQUEST);
    }
    const deletedPost = await this.postRepository.deleteOne(postId);
    return {
      status: HttpStatus.ACCEPTED,
      postId: postId,
    };
  }
  async updatePost(postId: string, userId: string, post: PostDto) {
    const curPost = await this.getPostById(postId);

    if (curPost.user._id.toString() !== userId.toString()) {
      throw new HttpException('Permission Dennied', HttpStatus.BAD_REQUEST);
    }

    const updatePost = await this.postRepository.findByIdAndUpdate(
      postId,
      post,
    );
    return updatePost;
  }

  async likePost(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    await post.populate([
      { path: 'user', select: '-password' },
      { path: 'categories', select: 'value' },
    ]);
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      const postLikes = post.likes.filter(
        (like) => like.toString() !== userId.toString(),
      );
      post.likes = postLikes;
      const updatedPost = await this.postRepository.findByIdAndUpdate(
        postId,
        post,
      );
      return updatedPost;
    } else {
      post.likes.push(userId);
      const updatedPost = await this.postRepository.findByIdAndUpdate(
        postId,
        post,
      );
      return updatedPost;
    }
  }
  async comment(postId: string, userId: string) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
