import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PaginationQueryDto } from './dto/pagination.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from 'src/database/models/post.model';
import { PaginatedPostsResponse } from 'src/types/post';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Create a new post
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: ExpressRequest,
  ): Promise<PostModel> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.create(createPostDto, userId);
  }

  // Get all posts
  // @Get()
  // async findAll(): Promise<PostModel[]> {
  //   return this.postService.findAll();
  // }

  @Get()
  async getPosts(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('filter') filter: string, // Additional query parameter
    @Query('userId') userId: string,
    @Req() req: ExpressRequest, // Add the request object
  ): Promise<PaginatedPostsResponse> {
    if (filter === 'my-posts' && userId) {
      return this.postService.getMyPosts(
        parseInt(userId),
        paginationQuery.page,
        paginationQuery.limit,
        req,
      );
    } else {
      return this.postService.getPosts(
        paginationQuery.page,
        paginationQuery.limit,
        req,
      );
    }
  }

  @Get('/search')
  async searchPosts(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('title') title: string,
    @Query('filter') filter: string,
    @Query('userId') userId: string,
    @Req() req: ExpressRequest,
  ): Promise<PaginatedPostsResponse> {
    if (filter === 'my-posts' && userId) {
      return this.postService.searchUserPostsByTitle(
        parseInt(userId),
        title,
        paginationQuery.page,
        paginationQuery.limit,
        req,
      );
    } else {
      return this.postService.searchPostsByTitle(
        title,
        paginationQuery.page,
        paginationQuery.limit,
        req,
      );
    }
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
    @Req() req: ExpressRequest,
  ): Promise<PostModel> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.update(id, updatePostDto, userId);
  }

  // Delete a post by ID (only if the user owns the post)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: ExpressRequest,
  ): Promise<void> {
    const userId = req.user.id; // Extract userId from the JWT
    return this.postService.remove(id, userId);
  }
}
