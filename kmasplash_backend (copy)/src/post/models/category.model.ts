import { Document, Schema } from 'mongoose';
import { IPost } from './post.model';

const CategorySchema = new Schema(
  {
    value: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
);
export { CategorySchema };

export interface Category extends Document {
  value: string;
  posts: [IPost];
}
