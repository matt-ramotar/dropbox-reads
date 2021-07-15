import axios, { AxiosResponse } from "axios";
import { Book } from "../types/Book";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchByTags(query: string): Promise<Array<Book>> {
  let response: AxiosResponse;
  console.log('QUERY: ', query)
  const url = `${API_URL}${VERSION}/search`
  try {
    response = await axios({
      method: 'post',
      url,
      data: {
        keyword: query
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }

  return response.data
}
