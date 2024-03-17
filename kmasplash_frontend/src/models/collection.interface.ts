import { CommonResponse } from "./commom.interface";
import { User } from "./user.interface";
import { Post } from "./post.interrface";

export interface Collection extends CommonResponse {
  owner: User;
  posts: Post[];
  name: string;
}
