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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_repositories_1 = require("../repository/user.repositories");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const hasUser = await this.userRepository.findByCondition({
            email: userDto.email,
        });
        if (hasUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.create(userDto);
    }
    async findUserById(id) {
        const user = await this.userRepository.findById(id);
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findByCondition({
            email: email,
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(filter, update) {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10);
        }
        return await this.userRepository.findByConditionAndUpdate(filter, update);
    }
    async findByLogin({ email, password }) {
        const user = await this.userRepository.findByCondition({
            email: email,
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isByPass = bcrypt.compareSync(password, user.password);
        if (!isByPass) {
            throw new common_1.HttpException('Email or password mismatch', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async getUserByRefresh(refresh_token, email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken);
        if (!is_equal) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async updateProfile(body, userId) {
        const user = await this.userRepository.findById(userId);
        const hasPermission = user._id.toString() === userId.toString();
        if (!hasPermission) {
            throw new common_1.HttpException('No Permission', common_1.HttpStatus.FORBIDDEN);
        }
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.findByIdAndUpdate(userId, body);
    }
    reverse(s) {
        return s.split('').reverse().join('');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repositories_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map