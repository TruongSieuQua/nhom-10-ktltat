"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    fileName: String,
    description: String,
    title: String,
    URL: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: 'posts',
});
exports.PostSchema = PostSchema;
//# sourceMappingURL=post.model.js.map