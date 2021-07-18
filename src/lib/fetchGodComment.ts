import axios, { AxiosResponse } from "axios";
import { GodComment } from "../types/GodComment";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchGodComment(id: string): Promise<GodComment> {
  try {
    const response: AxiosResponse = await axios.get(buildUrl(id));

    const data: GodComment = response.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function buildUrl(id: string): string {
  return API_URL + VERSION + `/comments/${id}/god`;
}
