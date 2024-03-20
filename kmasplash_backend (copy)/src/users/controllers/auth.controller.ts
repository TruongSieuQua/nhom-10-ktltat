import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginDto } from '../dto/user.base.dto';
import { AuthService } from '../services/auth.services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
  @Post('refresh')
  async refresh(@Body() body) {
    return await this.authService.refresh(body.refresh_token);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logOut(@Req() req) {
    await this.authService.logout(req.user);
    return {
      statusCode: 200,
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Body() body, @Req() req) {
    const _userId = req.user._id;

    await this.authService.changePassword(_userId, body);
    return {
      statusCode: 200,
    };
  }
}
