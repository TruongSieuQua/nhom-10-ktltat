"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionSchema = void 0;
const mongoose_1 = require("mongoose");
const CollectionSchema = new mongoose_1.Schema({
    name: String,
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
    description: String,
}, {
    timestamps: true,
    collection: 'collections',
});
exports.CollectionSchema = CollectionSchema;
//# sourceMappingURL=collection.model.js.map