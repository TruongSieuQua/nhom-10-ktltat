import { PostRepository } from './../repository/post.repositories';
import { CategoryRepository } from '../repository/category.repositories';
import { CategoryDto } from '../dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly postRepository;
    constructor(categoryRepository: CategoryRepository, postRepository: PostRepository);
    getAll(): Promise<import("../models/category.model").Category[]>;
    create(createCategoryDto: CategoryDto): Promise<any>;
    getPosts(categoryId: any): Promise<import("../models/post.model").IPost[]>;
}
