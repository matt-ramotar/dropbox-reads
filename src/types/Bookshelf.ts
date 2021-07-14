export interface Bookshelf {
  id: string;
  name: string;
  description: string;
  bookIds?: string[];
  userId: string;
  tagIds?: string[];
}
