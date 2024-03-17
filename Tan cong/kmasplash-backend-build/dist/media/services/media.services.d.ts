import { MediaRepository } from '../repository/media.repositories';
export declare class MediaService {
    private readonly mediaRepository;
    private readonly region;
    private readonly accessKeyId;
    private readonly secretAccessKey;
    private readonly publicBucketName;
    constructor(mediaRepository: MediaRepository);
    getLinkMediaKey(mediaKey: any): string;
    updateACL(media_id: any): Promise<string>;
    upload(file: any): Promise<any>;
    deleteFileS3(media_id: any): Promise<boolean>;
    private uploadS3;
    private slug;
    private getS3;
}
