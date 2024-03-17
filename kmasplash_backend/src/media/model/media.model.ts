import { Document, Schema } from 'mongoose';

const MediaSchema = new Schema(
  {
    name: String,
    fileName: String,
    mine_type: String,
    size: Number,
    key: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'media__medias',
  },
);
export { MediaSchema };

export interface Media extends Document {
  name: string;
  fileName: string;
  mine_type: string;
  size: number;
  key: string;
  createdAt: Date;
}
