import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as ExpressRequest } from 'express';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/types/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.userService.findAll();
  }

  // get the logged in user
  @Get('/me')
  async currentUser(@Req() req: ExpressRequest) {
    const UserId = req.user?.id;
    return this.userService.getCurrentUser(UserId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN) // as for my purpose only admin should edit
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: ExpressRequest,
  ) {
    const adminId = req.user.id;
    return this.userService.update(+id, updateUserDto, adminId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
