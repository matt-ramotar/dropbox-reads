import { Book } from "./Book";
import { BookshelfBook } from "./BookshelfBook";

export interface RecommendABookSuccessResponse {
  book: Book;
  bookshelfBook: BookshelfBook;
  bookshelfId: string;
}
