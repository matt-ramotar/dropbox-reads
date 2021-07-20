import axios, { AxiosResponse } from "axios";
import { Book } from "../types/Book";
import { GET_BOOKS, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchBooks(): Promise<Book[]> {
  const response: AxiosResponse = await axios.get(buildUrl());

  const data: Book[] = response.data;

  return data;
}

function buildUrl(): string {
  return API_URL + VERSION + GET_BOOKS;
}
