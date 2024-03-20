import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../dto/user.base.dto';
import { UserRepository } from '../repository/user.repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const hasUser = await this.userRepository.findByCondition({
      email: userDto.email,
    });
    if (hasUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.create(userDto);
  }
  async findUserById(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }
  async findByEmail(email) {
    const user = await this.userRepository.findByCondition({
      email: email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }
  async findByLogin({ email, password }: LoginDto) {
    const user = await this.userRepository.findByCondition({
      email: email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isByPass = bcrypt.compareSync(password, user.password);
    if (!isByPass) {
      throw new HttpException(
        'Email or password mismatch',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
  async getUserByRefresh(refresh_token, email) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const is_equal = await bcrypt.compare(
      this.reverse(refresh_token),
      user.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async updateProfile(body: UpdateUserDto, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.findByIdAndUpdate(userId, body);
  }
  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
