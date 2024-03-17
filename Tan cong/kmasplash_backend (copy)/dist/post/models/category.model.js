"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    value: String,
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
}, {
    timestamps: true,
    collection: 'categories',
});
exports.CategorySchema = CategorySchema;
//# sourceMappingURL=category.model.js.map