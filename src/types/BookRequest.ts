export interface BookRequest {
  userId: string;
  googleId: string;
  title: string;
  coverImage: string;
  authorId: string;
  tagIds: string[];
}
