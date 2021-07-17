import axios from "axios";
import { Bookshelf } from "../types/Bookshelf";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function createBookshelf(userId: string, name: string, description: string, tags: string[]): Promise<Bookshelf> {
  const body = { name, description, userId, tagIds: tags };
  console.log(body);
  const response = await axios.post(`${API_URL}${VERSION}/bookshelves`, body);
  return response.data;
}
