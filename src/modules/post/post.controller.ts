import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from 'src/database/models/post.model';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Create a new post
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: ExpressRequest,
  ): Promise<PostModel> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.create(createPostDto, userId);
  }

  // Get all posts
  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postService.findAll();
  }

  // Get a single post by ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postService.findOne(id);
  }

  // Update a post by ID (only if the user owns the post)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: ExpressRequest,
  ): Promise<PostModel> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.update(id, updatePostDto, userId);
  }

  // Delete a post by ID (only if the user owns the post)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.remove(id, userId);
  }
}
