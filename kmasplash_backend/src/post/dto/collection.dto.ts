import { IsNotEmpty, IsString } from 'class-validator';

export class CollectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CollectionPaginationDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  limit: number;
}
