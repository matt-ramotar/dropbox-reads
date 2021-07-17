import axios, { AxiosResponse } from "axios";
import { GodBookshelf } from "../types/GodBookshelf";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchGodBookshelf(id: string): Promise<GodBookshelf> {
  const response: AxiosResponse = await axios.get(buildUrl(id));

  const data: GodBookshelf = response.data;

  return data;
}

function buildUrl(id: string): string {
  return API_URL + VERSION + `/bookshelves/${id}/god`;
}
