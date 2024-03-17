"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(doc) {
        const createdEntity = new this.model(doc);
        return await createdEntity.save();
    }
    async findById(id, option) {
        return this.model.findById(id, option);
    }
    async findByCondition(filter, field, option, populate) {
        return this.model.findOne(filter, field, option);
    }
    async getByCondition(filter, field, option, populate) {
        return this.model
            .find(filter, field, option)
            .sort({
            createdAt: 'descending',
        })
            .populate(populate);
    }
    async countDocuments(filter) {
        return this.model.countDocuments(filter);
    }
    async findAll() {
        return this.model.find();
    }
    async aggregate(option) {
        return this.model.aggregate(option);
    }
    async populate(result, option) {
        return await this.model.populate(result, option);
    }
    async deleteOne(id) {
        return this.model.deleteOne({ _id: id });
    }
    async deleteMany(id) {
        return this.model.deleteMany({ _id: { $in: id } });
    }
    async deleteByCondition(filter) {
        return this.model.deleteMany(filter);
    }
    async findByConditionAndUpdate(filter, update) {
        return this.model.findOneAndUpdate(filter, update);
    }
    async updateMany(filter, update, option, callback) {
        return this.model.updateMany(filter, update, option);
    }
    async findByIdAndUpdate(id, update, populate) {
        return this.model
            .findByIdAndUpdate(id, update, { new: true })
            .populate(populate);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map