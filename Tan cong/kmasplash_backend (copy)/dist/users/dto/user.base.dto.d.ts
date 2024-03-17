export declare class UpdateUserDto {
    fullName: string;
    avatar: string;
    bio: string;
    userName: string;
    portfolio: string;
    facebookId: string;
    instagramId: string;
    location: string;
    password: string;
}
export declare class CreateUserDto extends UpdateUserDto {
    password: string;
    email: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
