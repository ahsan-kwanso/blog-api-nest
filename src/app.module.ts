import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env config globally
    DatabaseModule,
    UserModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
