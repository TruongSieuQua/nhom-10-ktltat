import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto/user.base.dto';
import { UserService } from '../services/user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: any) {
    const user = req.user;
    return user;
  }
  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateProfile(@Body() body: UpdateUserDto, @Req() req: any) {
    const _userId = req.body.userId;
    return await this.userService.updateProfile(body, _userId);
  }
}
