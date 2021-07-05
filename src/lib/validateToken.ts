import axios, { AxiosResponse } from "axios";
import SafeUser from "../types/SafeUser";
import { VALIDATE_TOKEN } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export interface ValidateTokenSuccess {
  user: SafeUser;
  token: string;
}

export default async function validateToken(
  token: string
): Promise<ValidateTokenSuccess> {
  const response: AxiosResponse = await axios.post(API_URL + VALIDATE_TOKEN, {
    token,
  });

  return response.data;
}
