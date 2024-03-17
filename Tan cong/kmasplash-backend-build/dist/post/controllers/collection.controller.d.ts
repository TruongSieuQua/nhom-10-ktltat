import { CollectionDto } from '../dto/collection.dto';
import { CollectionService } from '../services/collection.service';
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    getAllCategories(): Promise<import("../models/collection.model").Collection[]>;
    createCategory(createCategoryDto: CollectionDto): Promise<any>;
    getAllPostsOf(category_id: any): Promise<import("../models/post.model").IPost[]>;
}
