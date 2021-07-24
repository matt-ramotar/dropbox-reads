import axios from "axios";
import { Tag } from "../types/Tag";
import { UPSERT_TAG, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function upsertTag(tag: string): Promise<Tag> {
  const response = await axios.post(buildUrl(), { tag });
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + UPSERT_TAG;
}
