import axios, { AxiosResponse } from "axios";
import { Feed } from "../types/Feed";
import { GodAction } from "../types/GodAction";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchFeed(userId: string, type: string, offset: number): Promise<GodAction[]> {
  const response: AxiosResponse = await axios.get(API_URL + VERSION + `/users/${userId}/feeds/${type.toString()}/${offset}`);
  const feed: Feed = response.data;
  return feed.godActions;
}
