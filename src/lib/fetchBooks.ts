import axios, { AxiosResponse } from "axios";
import { GodBook } from "../types/GodBook";
import { GET_BOOKS, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchBooks(): Promise<GodBook[]> {
  const response: AxiosResponse = await axios.get(buildUrl());

  const data: GodBook[] = response.data;

  return data;
}

function buildUrl(): string {
  return API_URL + VERSION + GET_BOOKS;
}
