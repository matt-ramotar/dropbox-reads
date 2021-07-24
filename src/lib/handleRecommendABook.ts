import { BookshelfBook } from "../types/BookshelfBook";
import { GoogleBook } from "../types/GoogleBook";
import createBookshelfBook from "./createBookshelfBook";
import fetchRecommendationsBookshelfId from "./fetchRecommendationsBookshelfId";
import upsertAuthor from "./upsertAuthor";
import upsertBook from "./upsertBook";
import upsertTag from "./upsertTag";

export default async function handleRecommendABook(book: GoogleBook, reason: string, userId: string): Promise<BookshelfBook> {
  // upsert tags
  const tagIds = [];
  for (const category of book.volumeInfo.categories) {
    const tags = category.split(" / ");
    for (const tag of tags) {
      const tagId = (await upsertTag(tag)).id;
      tagIds.push(tagId);
    }
  }
  // upsert authors

  const authorIds = [];
  for (const name of book.volumeInfo.authors) {
    const names = name.split(" ");
    const lastName = name[names.length - 1];
    const firstName = names[0];

    const authorId = (await upsertAuthor(firstName, lastName, name)).id;
    authorIds.push(authorId);
  }

  // upsert book

  const bookId = (
    await upsertBook(
      book.id,
      book.volumeInfo.title,
      book.volumeInfo.description,
      authorIds,
      tagIds,
      userId,
      book.volumeInfo.imageLinks.thumbnail ??
        `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api`
    )
  ).id;

  // get recommendations bookshelf id
  const bookshelfId = await fetchRecommendationsBookshelfId(userId);

  // save book to bookshelf

  const bookshelfBook = await createBookshelfBook(bookId, bookshelfId, reason, userId);

  return bookshelfBook;
}
