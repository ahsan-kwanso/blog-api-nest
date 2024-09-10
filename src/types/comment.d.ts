import { Optional } from 'sequelize';

// Base interface for comment data
interface BaseCommentData {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for comment including user and post associations
interface Comment extends BaseCommentData {
  PostId: number;
  ParentCommentId?: number;
  UserId: number;
}

// Interface for comment data used in responses
interface CommentData extends BaseCommentData {
  UserId: number;
  PostId: number;
  ParentCommentId: number | null;
  subComments: CommentData[];
}

// Response type for creating and updating comments
interface CommentResponse {
  success: boolean;
  comment?: Comment; // Reuse the Comment interface here
  message?: string;
}

// Response type for getting comments by post ID
interface CommentsResult {
  success: boolean;
  data?: {
    comments: CommentData[]; // Reuse the CommentData interface here
  };
  message?: string;
}
