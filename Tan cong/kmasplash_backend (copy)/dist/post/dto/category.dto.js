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
exports.CategoryDto = exports.CategoryName = void 0;
const class_validator_1 = require("class-validator");
var CategoryName;
(function (CategoryName) {
    CategoryName["NATURE"] = "Nature";
    CategoryName["ANIMALS"] = "Animals";
    CategoryName["FOOD"] = "Food";
    CategoryName["ARCHITECTURE"] = "Architecture";
    CategoryName["TRAVEL"] = "Travel";
    CategoryName["ART"] = "Art";
    CategoryName["FASHION"] = "Fashion";
    CategoryName["SPORTS"] = "Sports";
    CategoryName["TECHNOLOGY"] = "Technology";
    CategoryName["BUSINESS"] = "Business";
    CategoryName["MUSIC"] = "Music";
    CategoryName["EDUCATION"] = "Education";
    CategoryName["HEALTH"] = "Health";
    CategoryName["PEOPLE"] = "People";
    CategoryName["TRANSPORTATION"] = "Transportation";
    CategoryName["SPACE"] = "Space";
    CategoryName["HOLIDAY"] = "Holiday";
})(CategoryName = exports.CategoryName || (exports.CategoryName = {}));
class CategoryDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "value", void 0);
exports.CategoryDto = CategoryDto;
//# sourceMappingURL=category.dto.js.map