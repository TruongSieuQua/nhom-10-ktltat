import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName: string;
  @IsString()
  @IsOptional()
  avatar: string;
  @IsOptional()
  @IsString()
  bio: string;
  @IsOptional()
  @IsString()
  userName: string;
  @IsOptional()
  @IsString()
  portfolio: string;
  @IsOptional()
  @IsString()
  facebookId: string;
  @IsOptional()
  @IsString()
  instagramId: string;
  @IsOptional()
  @IsString()
  location: string;
  @IsOptional()
  @IsString()
  password: string;
}

export class CreateUserDto extends UpdateUserDto {
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
