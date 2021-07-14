import axios, { AxiosResponse } from "axios";
import { GodUser } from "../types/GodUser";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchUserProfile(username: string): Promise<GodUser> {
  const response: AxiosResponse = await axios.get(buildUrl(username));

  const data: GodUser = response.data;

  return data;
}

function buildUrl(username: string): string {
  return API_URL + VERSION + `/users/${username}/profile`;
}
