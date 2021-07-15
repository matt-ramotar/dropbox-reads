import { API_URL } from "../util/secrets";

export async function getBooksByTitle(bookName: string) {
  bookName = bookName.replace(" ", "%20");
  const response = await fetch(`http://localhost:5000/v1/books/${bookName}/books`);
  const data = await response.json();

  return data;
}
