import { IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { IUser } from 'src/users/models/user.model';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  @Min(1)
  @Max(250)
  comment: string;
  user: IUser;
}
