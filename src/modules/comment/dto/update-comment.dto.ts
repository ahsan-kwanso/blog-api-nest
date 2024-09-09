import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsOptional()
  UserId?: number;

  @IsInt()
  @IsOptional()
  PostId?: number;

  @IsInt()
  @IsOptional()
  ParentCommentId?: number;
}
