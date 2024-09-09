// src/modules/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import getSequelizeConfig from '../config/sequelize.config';
import { User } from '../database/models/user.model';
import { Post } from '../database/models/post.model';
import { Comment } from '../database/models/comment.model';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => getSequelizeConfig(),
    }),
    SequelizeModule.forFeature([User, Post, Comment]), // Register models
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
