import axios from "axios";
import { Book } from "../types/Book";
import { UPSERT_BOOK, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function upsertBook(
  googleId: string,
  title: string,
  description: string,
  authorIds: string[],
  tagIds: string[],
  userId: string,
  coverImage?: string
): Promise<Book> {
  const response = await axios.post(buildUrl(), { googleId, title, description, coverImage, authorIds, tagIds, userId });
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + UPSERT_BOOK;
}
