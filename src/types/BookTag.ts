export interface BookTag {
  id: string;
  bookId: string;
  tagId: string;
  userAddedById: string;
  upvoteIds?: string[];
}
