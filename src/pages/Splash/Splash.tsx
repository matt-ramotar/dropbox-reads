import { Box, Grid } from "@material-ui/core";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { extractUsername } from "../../helpers";
import logo from "../../images/logo.png";
import splash from "../../images/splash.png";
import { continueWithGoogle } from "../../lib";
import { GOOGLE_CLIENT_ID } from "../../util/secrets";
import styles from "./splash.module.scss";

interface ProfileObj {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export default function Splash(): JSX.Element {
  const handleLogin = async (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("code" in data) return;

    const {
      givenName: firstName,
      familyName: lastName,
      email,
      googleId,
      imageUrl: picture,
    } = data.profileObj as ProfileObj;

    const username = extractUsername(email);

    const { user, token } = await continueWithGoogle(
      firstName,
      lastName,
      email,
      username,
      googleId,
      picture
    );

    console.log("USER", user);
    console.log("TOKEN", token);
  };

  return (
    <Grid className={styles.grid}>
      <Box className={styles.nav}>
        <img src={logo} alt="Dropbox Reads logo" className={styles.logo} />

        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID ?? ""}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </Box>

      <img src={splash} alt="Dropboxer reading" className={styles.splash} />
    </Grid>
  );
}
