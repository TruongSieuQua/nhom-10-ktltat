import { Document, Schema } from 'mongoose';
import { IUser } from 'src/users/models/user.model';

const CommentSchema = new Schema(
  {
    comment: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'comments',
  },
);

export { CommentSchema };
export interface Comment extends Document {
  comment: string;
  user: IUser;
}
