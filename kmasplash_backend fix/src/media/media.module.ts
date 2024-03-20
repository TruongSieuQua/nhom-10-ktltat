import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaController } from './controllers/media.controller';
import { MediaSchema } from './model/media.model';
import { MediaRepository } from './repository/media.repositories';
import { MediaService } from './services/media.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Media',
        schema: MediaSchema,
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
})
export class MediaModule {}
