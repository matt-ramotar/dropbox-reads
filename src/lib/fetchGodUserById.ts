import axios, { AxiosResponse } from "axios";
import { GodUser } from "../types/GodUser";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchGodUserById(userId: string): Promise<GodUser> {
  const response: AxiosResponse = await axios.get(API_URL + VERSION + `/users/${userId}/god`);
  const godUser: GodUser = response.data;
  return godUser;
}
