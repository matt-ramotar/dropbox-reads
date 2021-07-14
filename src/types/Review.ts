export interface Review {
  id: string;
  reviewerId: string;
  bookId: string;
  reviewUpvoteIds?: string[];
  commentIds?: string[];
  reviewReactionIds?: string[];
  rating: number;
  body: string;
}
