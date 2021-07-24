export interface Book {
  id: string;
  googleId: string;
  title: string;
  description: string;
  coverImage?: string;
  authorIds: string[];
  bookTagIds?: string[];
  userAddedById: string;
  bookshelfIds?: string[];
  reviewIds?: string[];
  bookUpvoteIds?: string[];
  bookCommentIds?: string[];
  dropboxPaperUrl?: string;
}
