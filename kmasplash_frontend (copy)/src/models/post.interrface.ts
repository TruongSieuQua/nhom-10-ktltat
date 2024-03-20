import { User } from "./auth.interface";
import { CommonResponse } from "./commom.interface";

export interface Post extends CommonResponse {
  fileName?: string;
  description: string;
  user: User;
  categories: string[] | any;
  URL: string;
  title: string;
  likes: string[];
  comments: Comment[];
}
export interface CreatePost
  extends Pick<Post, "fileName" | "description" | "title" | "categories"> {
  URL?: string;
}
export interface Comment extends CommonResponse {
  user: Pick<User, "avatar" | "fullName">;
  comment: string;
}
export interface UploadResponse extends CommonResponse {
  name: string;
  size: number;
  key: string;
}
export interface UploadData {
  file: {
    uid: string;
  };
  size: number;
  mimetype: string;
  originalname: string;
}

export interface Category extends CommonResponse {
  value: string;

  // posts: [Post];
}
export enum CategoryName {
  NATURE = "Nature",
  ANIMALS = "Animals",
  FOOD = "Food",
  ARCHITECTURE = "Architecture",
  TRAVEL = "Travel",
  ART = "Art",
  FASHION = "Fashion",
  SPORTS = "Sports",
  TECHNOLOGY = "Technology",
  BUSINESS = "Business",
  MUSIC = "Music",
  EDUCATION = "Education",
  HEALTH = "Health",
  PEOPLE = "People",
  TRANSPORTATION = "Transportation",
  SPACE = "Space",
  HOLIDAY = "Holiday",
}

export interface PostUpdate {
  postId: string;
  method?: "PATCH" | "DELETE";
  body?: CreatePost;
}

export interface PostEntity {
  ids: string[];
  entities: {
    [key: string]: Post;
  };
}
