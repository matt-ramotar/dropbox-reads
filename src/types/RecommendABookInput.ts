export interface RecommendABookInput {
  googleId: string;
  title: string;
  description: string;
  coverImage?: string;
  authorName: string;
  bookTags?: string[];
  userId: string;
}
