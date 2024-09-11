import { Role } from './role.enum';
export interface UserWithNumberOfPosts {
  id: number;
  name: string;
  email: string;
  role: string;
  posts: number;
}
