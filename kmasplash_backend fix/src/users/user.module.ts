import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.services';
import { UserService } from './services/user.services';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: 'lamsau',
      signOptions: {
        expiresIn: 60 * 60 * 24 * 30,
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtStrategy, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
