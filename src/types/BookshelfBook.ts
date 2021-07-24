export interface BookshelfBook {
  id: string;
  bookshelfId: string;
  bookId: string;
  userId: string;
  reason?: string;
}
