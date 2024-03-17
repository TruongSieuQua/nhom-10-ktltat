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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_services_1 = require("../services/media.services");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async getLinkAccess(key) {
        const url = this.mediaService.getLinkMediaKey(key);
        return {
            url: url,
        };
    }
    async upload(file) {
        return await this.mediaService.upload(file);
    }
    async uploads(files) {
        const medias = [];
        for (const item of files) {
            medias.push(await this.mediaService.upload(item));
        }
        return medias;
    }
    async updateAcl(media_id) {
        return await this.mediaService.updateACL(media_id);
    }
    async delete(media_id) {
        await this.mediaService.deleteFileS3(media_id);
        return true;
    }
};
__decorate([
    (0, common_1.Get)('access'),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getLinkAccess", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "upload", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploads", null);
__decorate([
    (0, common_1.Put)('update-acl'),
    __param(0, (0, common_1.Body)('media_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "updateAcl", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('media_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "delete", null);
MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_services_1.MediaService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map