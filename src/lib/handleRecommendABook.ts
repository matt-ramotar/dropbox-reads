import { GoogleBook } from "../types/GoogleBook";
import { RecommendABookSuccessResponse } from "../types/RecommendABookSuccessResponse";
import createBookshelfBook from "./createBookshelfBook";
import fetchRecommendationsBookshelfId from "./fetchRecommendationsBookshelfId";
import upsertAuthor from "./upsertAuthor";
import upsertBook from "./upsertBook";
import upsertTag from "./upsertTag";

export default async function handleRecommendABook(
  googleBook: GoogleBook,
  reason: string,
  userId: string
): Promise<RecommendABookSuccessResponse> {
  // upsert tags
  const tagIds = [];
  for (const category of googleBook.volumeInfo.categories) {
    const tags = category.split(" / ");
    for (const tag of tags) {
      const tagId = (await upsertTag(tag)).id;
      tagIds.push(tagId);
    }
  }

  // upsert authors
  const authorIds = [];
  for (const name of googleBook.volumeInfo.authors) {
    const names = name.split(" ");
    const lastName = name[names.length - 1];
    const firstName = names[0];

    const authorId = (await upsertAuthor(firstName, lastName, name)).id;
    authorIds.push(authorId);
  }

  // upsert book
  const book = await upsertBook(
    googleBook.id,
    googleBook.volumeInfo.title,
    googleBook.volumeInfo.description,
    authorIds,
    tagIds,
    userId,
    googleBook.volumeInfo.imageLinks.thumbnail ??
      `https://books.google.com/books/content?id=${googleBook.id}&printsec=frontcover&img=1&zoom=4&source=gbs_api`
  );

  // get recommendations bookshelf id
  const bookshelfId = await fetchRecommendationsBookshelfId(userId);

  // save book to bookshelf
  const bookshelfBook = await createBookshelfBook(book.id, bookshelfId, reason, userId);

  return { book, bookshelfBook, bookshelfId };
}
