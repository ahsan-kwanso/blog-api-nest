import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsInt()
  @IsNotEmpty()
  UserId: number;

  @IsInt()
  @IsNotEmpty()
  PostId: number;

  @IsInt()
  @IsOptional()
  ParentCommentId?: number;
}
