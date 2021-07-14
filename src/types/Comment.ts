export interface Comment {
  id: string;
  userId: string;
  reviewId?: string;
  bookId?: string;
  parentCommentId?: string;
  childrenCommentIds?: string[];
  body: string;
  commentUpvoteIds?: string[];
  commentReactionIds?: string[];
}
