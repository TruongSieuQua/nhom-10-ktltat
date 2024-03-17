"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const media_controller_1 = require("./controllers/media.controller");
const media_model_1 = require("./model/media.model");
const media_repositories_1 = require("./repository/media.repositories");
const media_services_1 = require("./services/media.services");
let MediaModule = class MediaModule {
};
MediaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Media',
                    schema: media_model_1.MediaSchema,
                },
            ]),
        ],
        controllers: [media_controller_1.MediaController],
        providers: [media_services_1.MediaService, media_repositories_1.MediaRepository],
    })
], MediaModule);
exports.MediaModule = MediaModule;
//# sourceMappingURL=media.module.js.map