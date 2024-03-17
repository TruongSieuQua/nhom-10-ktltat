import { LoginDto, CreateUserDto } from './../dto/user.base.dto';
import { UserService } from './user.services';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../models/user.model';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(registerDto: CreateUserDto): Promise<{
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: number;
        user: any;
    } | {
        expiresIn: number;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: any;
    }>;
    login(userDto: LoginDto): Promise<{
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: number;
        user: IUser;
    } | {
        expiresIn: number;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: IUser;
    }>;
    validateUser(email: any): Promise<IUser>;
    private _createToken;
    refresh(refresh_token: any): Promise<{
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: number;
        user: IUser;
    } | {
        expiresIn: number;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: IUser;
    }>;
    changePassword(userId: any, body: any): Promise<IUser>;
    logout(user: IUser): Promise<void>;
}
