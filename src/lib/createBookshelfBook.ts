import axios from "axios";
import { BookshelfBook } from "../types/BookshelfBook";
import { CREATE_BOOKSHELF_BOOK, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function createBookshelfBook(
  bookId: string,
  bookshelfId: string,
  reason: string,
  userId: string
): Promise<BookshelfBook> {
  const response = await axios.post(buildUrl(), { bookId, bookshelfId, reason, userId });
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + CREATE_BOOKSHELF_BOOK;
}
