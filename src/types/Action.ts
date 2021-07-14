export interface Action {
  id: string;
  type: string;
  datetime: Date;
  userId: string;
  otherUserId?: string;
  bookId?: string;
  bookshelfId?: string;
  bookTagId?: string;
  tagId?: string;
  reviewId?: string;
  commentId?: string;
  otherCommentId?: string;
  reviewReactionId?: string;
  commentReactionId?: string;
}
