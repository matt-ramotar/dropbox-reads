export interface BookRequest {
  userId: string;
  googleId: string;
  title: string;
  description: string;
  coverImage: string;
  authorId: string;
  tagIds: string[];
}
