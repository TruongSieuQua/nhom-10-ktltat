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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const post_repositories_1 = require("../repository/post.repositories");
const collection_repositories_1 = require("../repository/collection.repositories");
let CollectionService = class CollectionService {
    constructor(collection, postRepository) {
        this.collection = collection;
        this.postRepository = postRepository;
    }
    async getAll() {
        return await this.collection.getByCondition({});
    }
    async create(createCategoryDto) {
        return await this.collection.create(createCategoryDto);
    }
    async getPosts(categoryId) {
        return await this.postRepository.getByCondition({
            categories: { $elemMatch: { $eq: categoryId } },
        });
    }
};
CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [collection_repositories_1.CollectionRepository,
        post_repositories_1.PostRepository])
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map