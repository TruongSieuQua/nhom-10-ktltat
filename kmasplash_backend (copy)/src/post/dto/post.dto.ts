import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IUser } from 'src/users/models/user.model';
import { CategoryName } from './category.dto';

export class PostDto {
  @IsString()
  @IsOptional()
  fileName: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  user: IUser;
  @IsNotEmpty()
  categories: [CategoryName];
  @IsString()
  @IsOptional()
  URL: string;
}

export class PostPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number;
  @IsOptional()
  @IsString()
  category: string;
  @IsOptional()
  @IsString()
  keyword: string;
}
