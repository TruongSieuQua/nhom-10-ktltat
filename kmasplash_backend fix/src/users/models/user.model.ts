import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    refreshToken: String,
    bio: String,
    userName: String,
    portfolio: String,
    facebookId: String,
    instagramId: String,
    avatar: String,
    location: String,
  },
  {
    collection: 'users',
    timestamps: true,
  },
);
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  count: true,
});

UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  count: true,
});
export { UserSchema };

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  refreshToken: string;
  avatar?: string;
  bio?: string;
  userName?: string;
  portfolio?: string;
  facebookId?: string;
  instagramId?: string;
  location?: string;
}
