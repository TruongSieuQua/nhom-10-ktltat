import { PostRepository } from 'src/post/repository/post.repositories';
import { CollectionDto } from '../dto/collection.dto';
import { CollectionRepository } from '../repository/collection.repositories';
export declare class CollectionService {
    private readonly collection;
    private readonly postRepository;
    constructor(collection: CollectionRepository, postRepository: PostRepository);
    getAll(): Promise<import("../models/collection.model").Collection[]>;
    create(createCategoryDto: CollectionDto): Promise<any>;
    getPosts(categoryId: any): Promise<import("../models/post.model").IPost[]>;
}
