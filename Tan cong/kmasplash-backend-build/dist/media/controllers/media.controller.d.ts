import { MediaService } from '../services/media.services';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    getLinkAccess(key: string): Promise<{
        url: string;
    }>;
    upload(file: any): Promise<any>;
    uploads(files: any): Promise<any[]>;
    updateAcl(media_id: string): Promise<string>;
    delete(media_id: string): Promise<boolean>;
}
