import { CategoryDto } from './../dto/category.dto';
import { CategoryService } from '../services/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<import("../models/category.model").Category[]>;
    createCategory(createCategoryDto: CategoryDto): Promise<any>;
    getAllPostsOf(category_id: any): Promise<import("../models/post.model").IPost[]>;
}
