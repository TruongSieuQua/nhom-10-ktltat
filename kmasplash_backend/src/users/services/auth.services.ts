import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, CreateUserDto } from './../dto/user.base.dto';
import { UserService } from './user.services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../models/user.model';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: CreateUserDto) {
    const user = await this.userService.create(registerDto);
    const token = await this._createToken(user);
    return {
      user,
      ...token,
    };
  }
  async login(userDto: LoginDto) {
    const user = await this.userService.findByLogin(userDto);
    const token = await this._createToken(user);
    return {
      user,
      ...token,
    };
  }
  async validateUser(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async _createToken({ email }, refresh = true) {
    const accessToken = this.jwtService.sign({ email });
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        {
          email,
        },
        {
          secret: 'refresh_token',
          expiresIn: 60 * 60 * 24,
        },
      );
      await this.userService.update(
        {
          email,
        },
        {
          refreshToken,
        },
      );
      return {
        expiresIn: 60 * 60 * 24 * 30,
        accessToken,
        refreshToken,
        expiresInRefresh: 60 * 60 * 24 * 30,
      };
    }
    return {
      expiresIn: 60 * 60 * 24 * 30,
      accessToken,
    };
  }
  async refresh(refresh_token) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: 'refresh_token',
      });
      const user = await this.userService.getUserByRefresh(
        refresh_token,
        payload.email,
      );
      const token = await this._createToken(user, false);
      return {
        user,
        ...token,
      };
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  async changePassword(userId, body) {
    const { password, newPassword } = body;
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      return user.save();
    }
  }
  async logout(user: IUser) {
    await this.userService.update(
      { email: user.email },
      { refreshToken: null },
    );
  }
}
