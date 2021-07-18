import axios from "axios";
import { GodComment } from "../types/GodComment";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function createComment(userId: string, bookId: string, body: string): Promise<GodComment> {
  const comment = {
    userId,
    bookId,
    body,
  };

  const response = await axios.post(buildUrl(), comment);
  return response.data;
}

function buildUrl(): string {
  return API_URL + VERSION + `/comments`;
}
