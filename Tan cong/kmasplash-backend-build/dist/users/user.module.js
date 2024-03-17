"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_model_1 = require("./models/user.model");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_services_1 = require("./services/auth.services");
const user_services_1 = require("./services/user.services");
const jwt_strategy_1 = require("./jwt.strategy");
const user_controller_1 = require("./controllers/user.controller");
const user_repositories_1 = require("./repository/user.repositories");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: user_model_1.UserSchema,
                },
            ]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                property: 'user',
                session: false,
            }),
            jwt_1.JwtModule.register({
                secret: 'lamsau',
                signOptions: {
                    expiresIn: 60 * 60 * 24 * 30,
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController, user_controller_1.UserController],
        providers: [auth_services_1.AuthService, user_services_1.UserService, jwt_strategy_1.JwtStrategy, user_repositories_1.UserRepository],
        exports: [user_services_1.UserService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=user.module.js.map