"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaSchema = void 0;
const mongoose_1 = require("mongoose");
const MediaSchema = new mongoose_1.Schema({
    name: String,
    fileName: String,
    mine_type: String,
    size: Number,
    key: String,
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    collection: 'media__medias',
});
exports.MediaSchema = MediaSchema;
//# sourceMappingURL=media.model.js.map