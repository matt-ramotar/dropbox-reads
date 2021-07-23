import axios, { AxiosResponse } from "axios";
import { GoogleBook } from "../types/GoogleBook";
import { GOOGLE_BOOKS_URL } from "../util/endpoints";
import { GOOGLE_BOOKS_API_KEY } from "../util/secrets";

interface GoogleBooksApiResponse {
  items: GoogleBook[];
  kind: string;
  totalItems: number;
}

export default async function fetchBooksFromGoogleBooksApi(title: string, authorName?: string): Promise<GoogleBook[]> {
  const response: AxiosResponse = await axios.get(buildUrl(title, authorName));
  const data: GoogleBooksApiResponse = response.data;
  return data.items;
}

function buildUrl(title: string, authorName?: string): string {
  if (authorName) return GOOGLE_BOOKS_URL + title + "+inauthor:" + authorName + "&key=" + GOOGLE_BOOKS_API_KEY;
  else return GOOGLE_BOOKS_URL + title + "&key=" + GOOGLE_BOOKS_API_KEY;
}
