import axios, { AxiosResponse } from "axios";
import { Tag } from "../types/Tag";
import { GET_TAGS, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchTags(): Promise<Tag[]> {
  const response: AxiosResponse = await axios.get(buildUrl());

  const data: Tag[] = response.data;

  return data;
}

function buildUrl(): string {
  return API_URL + VERSION + GET_TAGS;
}
