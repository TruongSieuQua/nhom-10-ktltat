import { ExceptionLoggerFilter } from './utils/ExpectionLogger.filter';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/user.module';
import { PostModule } from './post/post.module';
import { APP_FILTER } from '@nestjs/core';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017'),
    UsersModule,
    PostModule,
    MediaModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionLoggerFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
