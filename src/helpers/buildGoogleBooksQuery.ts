import { GOOGLE_BOOKS_URL } from "../util/endpoints";
import { GOOGLE_BOOKS_API_KEY } from "../util/secrets";

export default function buildGoogleBooksQuery(title: string, author: string): string {
  if (author) {
    return `${GOOGLE_BOOKS_URL}${encodeURI(title)}+inauthor:${encodeURI(author)}&key=${GOOGLE_BOOKS_API_KEY}`;
  }

  return `${GOOGLE_BOOKS_URL}${encodeURI(title)}&key=${GOOGLE_BOOKS_API_KEY}`;
}
