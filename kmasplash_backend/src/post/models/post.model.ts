import { Document, Schema } from 'mongoose';
import { Comment } from 'src/post/models/comment.model';
import { IUser } from 'src/users/models/user.model';
import { Category } from './category.model';

const PostSchema = new Schema(
  {
    fileName: String,
    description: String,
    title: String,
    URL: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    // timestamps: {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // },
    collection: 'posts',
  },
);

export { PostSchema };
export interface IPost extends Document {
  fileName?: string;
  description: string;
  user: IUser;
  categories: [Category];
  URL?: string;
  title: string;
  likes: string[];
  comments: Comment[];
}
