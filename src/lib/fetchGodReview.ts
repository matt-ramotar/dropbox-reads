import axios, { AxiosResponse } from "axios";
import { GodReview } from "../types/GodReview";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchGodReview(id: string): Promise<GodReview> {
  try {
    const response: AxiosResponse = await axios.get(buildUrl(id));

    const data: GodReview = response.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function buildUrl(id: string): string {
  return API_URL + VERSION + `/reviews/${id}/god`;
}
