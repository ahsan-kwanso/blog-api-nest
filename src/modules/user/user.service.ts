import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { User } from 'src/database/models/user.model';
import { Post } from 'src/database/models/post.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithNumberOfPosts } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: Partial<CreateUserDto>): Promise<User> {
    // Check if a user with the same email already exists
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      // If user exists, throw ConflictException
      throw new ConflictException('A user with this email already exists');
    }
    const user = await this.userModel.create(createUserDto as any);
    return user.reload(); // to prevent password in response
  }

  //this is being used by controller so I will send number of posts embedded in here
  async findAll(): Promise<UserWithNumberOfPosts[]> {
    const users = await this.userModel.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'role',
        // Use Sequelize.fn to count the number of posts and cast it as an integer
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts'],
      ],
      include: [
        {
          model: Post, // Include the Post model to count posts
          attributes: [], // No need to return post attributes, just count
        },
      ],
      group: ['User.id'], // Group by User to count posts correctly
      raw: true, // Return raw results instead of Sequelize model instances
    });

    // Map the result to match the UserWithNumberOfPosts interface
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      posts: Number(user.posts), // Cast the posts count to a number
    }));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await user.update(updateUserDto);
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  // get logged in user
  async getCurrentUser(id: number): Promise<User> {
    return this.findOne(id);
  }
}
