import { AxiosResponse } from "axios";

import { BookRequest } from "../types/BookRequest";
import SafeUser from "../types/SafeUser";
import { GoogleBookData } from "../types/GoogleBookData";
import upsertAuthor from "./upsertAuthor";

export default async function prepareBookForDB(
  book: GoogleBookData,
  user: SafeUser
): Promise<BookRequest> {
  const { id, volumeInfo } = book;
  let authorId = "";

  try {
    const response: AxiosResponse = await upsertAuthor(book);
    authorId = response.data.id;
  } catch (error) {
    console.log(error);
    throw error;
  }

  return {
    userId: user.id,
    googleId: id,
    title: volumeInfo.title,
    coverImage: volumeInfo.imageLinks.thumbnail,
    authorId,
    tagIds: [],
  };
}
