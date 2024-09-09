import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.create(createCommentDto as any);
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
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await comment.destroy();
  }
}
