"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_services_1 = require("./user.services");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const user = await this.userService.create(registerDto);
        const token = await this._createToken(user);
        return Object.assign({ user }, token);
    }
    async login(userDto) {
        const user = await this.userService.findByLogin(userDto);
        const token = await this._createToken(user);
        return Object.assign({ user }, token);
    }
    async validateUser(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async _createToken({ email }, refresh = true) {
        const accessToken = this.jwtService.sign({ email });
        if (refresh) {
            const refreshToken = this.jwtService.sign({
                email,
            }, {
                secret: 'refresh_token',
                expiresIn: 60 * 60 * 24,
            });
            await this.userService.update({
                email,
            }, {
                refreshToken,
            });
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
            const user = await this.userService.getUserByRefresh(refresh_token, payload.email);
            const token = await this._createToken(user, false);
            return Object.assign({ user }, token);
        }
        catch (e) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async changePassword(userId, body) {
        const { password, newPassword } = body;
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new common_1.HttpException('User not Found', common_1.HttpStatus.NOT_FOUND);
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            throw new common_1.HttpException('Password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            return user.save();
        }
    }
    async logout(user) {
        await this.userService.update({ email: user.email }, { refreshToken: null });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_services_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map