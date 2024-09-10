import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/database/models/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    UserId: number,
  ): Promise<Comment> {
    const comment = await this.commentModel.create({
      ...createCommentDto,
      UserId, // Attach the UserId from the JWT token
    } as Comment);
    return comment.reload();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    UserId: number,
  ): Promise<Comment> {
    const comment = await this.findOne(id);

    // Check if the user owns the comment
    if (comment.UserId !== UserId) {
      throw new ForbiddenException(
        'You do not have permission to update this comment',
      );
    }

    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number, UserId: number): Promise<void> {
    const comment = await this.findOne(id);

    // Check if the user owns the comment
    if (comment.UserId !== UserId) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    await comment.destroy();
  }
}
