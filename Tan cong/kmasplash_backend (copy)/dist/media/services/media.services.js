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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const mongodb_1 = require("mongodb");
const media_repositories_1 = require("../repository/media.repositories");
let MediaService = class MediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
        this.region = 'your-region';
        this.accessKeyId = 'your-key';
        this.publicBucketName = 'your-public-bug-key';
        this.secretAccessKey = 'your-secret-access-key';
    }
    getLinkMediaKey(mediaKey) {
        const s3 = this.getS3();
        return s3.getSignedUrl('getObject', {
            Key: mediaKey,
            Bucket: this.publicBucketName,
            Expires: 60 * 60 * 12,
        });
    }
    async updateACL(media_id) {
        const media = await this.mediaRepository.findById(media_id);
        const s3 = this.getS3();
        s3.putObjectAcl({
            Bucket: this.publicBucketName,
            Key: media.key,
            ACL: 'public-read',
        }, (err, data) => { });
        return (s3.endpoint.protocol +
            '://' +
            this.publicBucketName +
            '.' +
            s3.endpoint.hostname +
            '/' +
            media.key);
    }
    async upload(file) {
        const objectId = new mongodb_1.ObjectId();
        const arr_name = file.originalname.split('.');
        const extension = arr_name.pop();
        const name = arr_name.join('.');
        const key = objectId + '/' + this.slug(name) + '.' + extension;
        const data = {
            _id: objectId,
            name: name,
            file_name: String(file.originalname),
            mime_type: file.mimetype,
            size: file.size,
            key: key,
        };
        await this.uploadS3(file.buffer, key, file.mimetype);
        return await this.mediaRepository.create(data);
    }
    async deleteFileS3(media_id) {
        const media = await this.mediaRepository.findById(media_id);
        const s3 = this.getS3();
        const params = {
            Bucket: this.publicBucketName,
            Key: media.key,
        };
        s3.deleteObject(params, (err, data) => { });
        await media.deleteOne();
        return true;
    }
    async uploadS3(file_buffer, key, content_type) {
        const s3 = this.getS3();
        const params = {
            Bucket: this.publicBucketName,
            Key: key,
            Body: file_buffer,
            ContentType: content_type,
            ACL: 'public-read',
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    slug(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
        const from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;';
        const to = 'AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------';
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        return str;
    }
    getS3() {
        return new aws_sdk_1.S3({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [media_repositories_1.MediaRepository])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.services.js.map