import { CreateUserDto, LoginDto } from '../dto/user.base.dto';
import { AuthService } from '../services/auth.services';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: number;
        user: import("../models/user.model").IUser;
    } | {
        expiresIn: number;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: import("../models/user.model").IUser;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
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
    refresh(body: any): Promise<{
        expiresIn: number;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: number;
        user: import("../models/user.model").IUser;
    } | {
        expiresIn: number;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: import("../models/user.model").IUser;
    }>;
    logOut(req: any): Promise<{
        statusCode: number;
    }>;
    changePassword(body: any, req: any): Promise<{
        statusCode: number;
    }>;
}
