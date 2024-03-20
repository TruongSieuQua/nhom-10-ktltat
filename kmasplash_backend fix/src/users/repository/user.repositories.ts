import { IUser } from './../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {
    super(userModel);
  }
}
