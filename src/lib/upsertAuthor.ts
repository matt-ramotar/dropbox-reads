import axios, { AxiosResponse } from "axios";
import { Author } from "../types/Author";
import { UPSERT_AUTHOR, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function upsertAuthor(firstName: string, lastName: string, name: string): Promise<Author> {
  const response: AxiosResponse = await axios.post(buildUrl(), { firstName, lastName, name });
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + UPSERT_AUTHOR;
}
