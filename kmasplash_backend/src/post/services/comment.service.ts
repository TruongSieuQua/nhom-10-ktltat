import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostRepository } from 'src/post/repository/post.repositories';
import { IUser } from 'src/users/models/user.model';
import { CommentDto } from '../dto/comment.dto';
import { CommentRepository } from '../repository/comment.repository';
@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}
  async createComment(postId: string, comment: CommentDto, user: IUser) {
    const post = await this.postRepository.findById(postId);
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    comment.user = user;
    const newComment = await this.commentRepository.create(comment);
    post.comments.unshift(newComment);
    return await this.postRepository.findByIdAndUpdate(postId, post, [
      { path: 'user', select: '-password' },
      { path: 'categories', select: 'value' },
      {
        path: 'comments',
        select: 'comment  createdAt',
        populate: { path: 'user', select: 'fullName avatar' },
      },
    ]);
  }
}
