import { IsNotEmpty, IsString } from 'class-validator';

export enum CategoryName {
  NATURE = 'Nature',
  ANIMALS = 'Animals',
  FOOD = 'Food',
  ARCHITECTURE = 'Architecture',
  TRAVEL = 'Travel',
  ART = 'Art',
  FASHION = 'Fashion',
  SPORTS = 'Sports',
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  MUSIC = 'Music',
  EDUCATION = 'Education',
  HEALTH = 'Health',
  PEOPLE = 'People',
  TRANSPORTATION = 'Transportation',
  SPACE = 'Space',
  HOLIDAY = 'Holiday',
}
export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  value: CategoryName;
}
