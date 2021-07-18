export interface Bookshelf {
  id: string;
  name: string;
  description: string;
  mainImage?: string;
  coverImage?: string;
  bookIds?: string[];
  userId: string;
  tagIds?: string[];
}
