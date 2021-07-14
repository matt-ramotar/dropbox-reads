export interface Book {
  id: string;
  googleId: string;
  title: string;
  coverImage?: string;
  authorId: string;
  bookTagIds?: string[];
  userAddedById: string;
  bookshelfIds?: string[];
  reviewIds?: string[];
  bookUpvoteIds?: string[];
  bookCommentIds?: string[];
}
