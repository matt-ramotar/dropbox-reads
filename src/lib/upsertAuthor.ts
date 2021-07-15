import axios, { AxiosResponse } from "axios";

import { API_URL } from "../util/secrets";
import { VERSION } from "../util/endpoints";
import { GoogleBookData } from "../types/GoogleBookData";

export default async function upsertAuthor(book: GoogleBookData): Promise<AxiosResponse> {
  const name = book.volumeInfo.authors[0].split(" ");
  const lastName = name.pop();
  const firstName = name.join(" ");
  const author = { firstName, lastName };
  const response: AxiosResponse = await axios.post(`${API_URL}${VERSION}/authors`, author);

  return response;
}
