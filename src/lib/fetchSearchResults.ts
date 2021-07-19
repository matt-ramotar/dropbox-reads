import axios from "axios";
import { GodBook } from "../types/GodBook";
import { SEARCH, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchSearchResults(query: string): Promise<GodBook[]> {
  const response = await axios.post(buildUrl(), { keyword: query });
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + SEARCH;
}
