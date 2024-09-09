import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Post } from './post.model';

@Table
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  PostId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ParentCommentId: number;

  @BelongsTo(() => Comment, 'ParentCommentId')
  parentComment: Comment;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  content: string;
}
