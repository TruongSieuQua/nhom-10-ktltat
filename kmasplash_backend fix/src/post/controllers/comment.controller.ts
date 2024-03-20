import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';

@Controller('post/:postId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Body() comment: Comment,
    @Param('postId') postId,
    @Req() req,
  ) {
    return await this.commentService.createComment(postId, comment, req.user);
  }
}
