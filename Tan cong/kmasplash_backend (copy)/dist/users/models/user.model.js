"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: String,
    email: String,
    password: String,
    refreshToken: String,
    bio: String,
    userName: String,
    portfolio: String,
    facebookId: String,
    instagramId: String,
    avatar: String,
    location: String,
}, {
    collection: 'users',
    timestamps: true,
});
exports.UserSchema = UserSchema;
UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    count: true,
});
UserSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    count: true,
});
//# sourceMappingURL=user.model.js.map