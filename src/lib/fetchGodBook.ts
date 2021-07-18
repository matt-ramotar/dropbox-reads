import axios, { AxiosResponse } from "axios";
import { GodBook } from "../types/GodBook";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchGodBook(id: string): Promise<GodBook> {
  try {
    const response: AxiosResponse = await axios.get(buildUrl(id));

    const data: GodBook = response.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function buildUrl(id: string): string {
  return API_URL + VERSION + `/books/${id}/god`;
}
