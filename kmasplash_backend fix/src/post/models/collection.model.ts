import { Document, Schema } from 'mongoose';
import { IPost } from './post.model';

const CollectionSchema = new Schema(
  {
    name: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    description: String,
  },
  {
    timestamps: true,
    collection: 'collections',
  },
);
export { CollectionSchema };

export interface Collection extends Document {
  name: string;
  posts: [IPost];
  description: string;
}
