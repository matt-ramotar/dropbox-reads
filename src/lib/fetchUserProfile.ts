import axios, { AxiosResponse } from "axios";
import UserProfile from "../types/UserProfile";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchUserProfile(username: string): Promise<UserProfile> {
  const response: AxiosResponse = await axios.get(buildUrl(username));

  const data: UserProfile = response.data;

  return data;
}

function buildUrl(username: string): string {
  return API_URL + VERSION + `/users/${username}/profile`;
}
