"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../users/user.module");
const category_controller_1 = require("./controllers/category.controller");
const collection_controller_1 = require("./controllers/collection.controller");
const comment_controller_1 = require("./controllers/comment.controller");
const post_controller_1 = require("./controllers/post.controller");
const category_model_1 = require("./models/category.model");
const collection_model_1 = require("./models/collection.model");
const comment_model_1 = require("./models/comment.model");
const post_model_1 = require("./models/post.model");
const category_repositories_1 = require("./repository/category.repositories");
const collection_repositories_1 = require("./repository/collection.repositories");
const comment_repository_1 = require("./repository/comment.repository");
const post_repositories_1 = require("./repository/post.repositories");
const category_service_1 = require("./services/category.service");
const collection_service_1 = require("./services/collection.service");
const comment_service_1 = require("./services/comment.service");
const post_service_1 = require("./services/post.service");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Post',
                    schema: post_model_1.PostSchema,
                },
                {
                    name: 'Category',
                    schema: category_model_1.CategorySchema,
                },
                {
                    name: 'Collection',
                    schema: collection_model_1.CollectionSchema,
                },
                {
                    name: 'Comment',
                    schema: comment_model_1.CommentSchema,
                },
            ]),
            user_module_1.UsersModule,
        ],
        controllers: [
            post_controller_1.PostController,
            category_controller_1.CategoryController,
            collection_controller_1.CollectionController,
            comment_controller_1.CommentController,
        ],
        providers: [
            post_service_1.PostServices,
            post_repositories_1.PostRepository,
            category_service_1.CategoryService,
            category_repositories_1.CategoryRepository,
            collection_repositories_1.CollectionRepository,
            collection_service_1.CollectionService,
            comment_service_1.CommentService,
            comment_repository_1.CommentRepository,
        ],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map