import { Post } from "./post.interrface";

export interface CommonResponse {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PhotosProps {
  userId?: string;
}
export interface PinterestLayoutType {
  data: Post[];
  lgLayoutColumn?: number;
  mdLayoutColumn?: number;

  xsLayoutColumn?: number;
}
