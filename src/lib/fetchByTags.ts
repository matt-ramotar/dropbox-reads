import axios, { AxiosResponse } from "axios";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";
import { GodBook } from "../types/GodBook";

export default async function fetchByTags(query: string): Promise<Array<GodBook>> {
  let response: AxiosResponse;
  const url = `${API_URL}${VERSION}/search`;
  try {
    response = await axios({
      method: "post",
      url,
      data: {
        keyword: query,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
  return response.data;
}