import { Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.services';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate({ email }: {
        email: any;
    }): Promise<import("./models/user.model").IUser>;
}
export {};
