import { CommonResponse } from "./commom.interface";
import { Image } from "./image.interface";

export interface User extends CommonResponse {
  username: string;
  password?: string;
  fullName: string;
  avatar?: Image;
  email?: string;
  location?: string;
  bio?: string;
  portfolio?: string;
  interest?: string[];
  register_day?: Date;
  confirmed?: boolean;
}
