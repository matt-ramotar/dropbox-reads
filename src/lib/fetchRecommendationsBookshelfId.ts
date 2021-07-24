import axios, { AxiosResponse } from "axios";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchRecommendationsBookshelfId(userId: string): Promise<string> {
  const response: AxiosResponse = await axios.get(buildUrl(userId));
  return response.data;
}

function buildUrl(userId: string): string {
  return API_URL + VERSION + `/users/${userId}/bookshelves/recommendations`;
}
