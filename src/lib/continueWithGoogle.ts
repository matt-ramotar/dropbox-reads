import axios, { AxiosResponse } from "axios";
import SafeUser from "../types/SafeUser";
import { CONTINUE_WITH_GOOGLE } from "../util/endpoints";
import { API_URL } from "../util/secrets";

interface ContinueWithGoogleSuccess {
  user: SafeUser;
  token: string;
}

export default async function continueWithGoogle(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  googleId: string,
  picture: string
): Promise<ContinueWithGoogleSuccess> {
  const response: AxiosResponse = await axios.post(
    API_URL + CONTINUE_WITH_GOOGLE,
    {
      firstName,
      lastName,
      email,
      username,
      googleId,
      picture,
    }
  );

  const data: ContinueWithGoogleSuccess = response.data;

  return data;
}
