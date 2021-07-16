import axios, {AxiosResponse} from "axios";
import {API_URL} from "../util/secrets";
import {VERSION} from "../util/endpoints";

export default async function postComment(userId: string, bookId: string, commentBody: string): Promise<AxiosResponse> {
  const comment = {
    userId: userId,
    bookId: bookId,
    body: commentBody,
  };

  return await axios.post(`${API_URL}${VERSION}/comments`, comment);
}
