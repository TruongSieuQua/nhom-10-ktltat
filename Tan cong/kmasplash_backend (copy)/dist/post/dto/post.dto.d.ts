import { IUser } from 'src/users/models/user.model';
import { CategoryName } from './category.dto';
export declare class PostDto {
    fileName: string;
    description: string;
    user: IUser;
    categories: [CategoryName];
    URL: string;
}
export declare class PostPaginationDto {
    page?: number;
    limit: number;
    category: string;
    keyword: string;
}
