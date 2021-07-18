import axios, { AxiosResponse } from "axios";
import { GodUser } from "../types/GodUser";
import { VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function fetchUsers(): Promise<GodUser[]> {
  try {
    const response: AxiosResponse = await axios.get(buildUrl());

    const data: GodUser[] = response.data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function buildUrl(): string {
  return API_URL + VERSION + `/users`;
}
