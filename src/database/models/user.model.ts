import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from './post.model';
import { Comment } from './comment.model';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password: string;

  // Added role column
  @Column({
    type: DataType.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user', // Default role is user
  })
  role: 'admin' | 'user';

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];
}
