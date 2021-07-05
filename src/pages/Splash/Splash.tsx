import { Box, Button, Typography } from "@material-ui/core";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import logo from "../../images/logo.png";
import splash from "../../images/splash.png";
import { GOOGLE_CLIENT_ID } from "../../util/secrets";
import styles from "./splash.module.scss";

export default function Splash(): JSX.Element {
  const handleLogin = async (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(data);
  };

  return (
    <Box>
      <Typography>Dropbox Reads</Typography>

      <img src={logo} alt="Dropbox Reads logo" className={styles.logo} />

      <img src={splash} alt="Dropboxer reading" className={styles.splash} />

      <Box>
        <Button className={styles.button}>
          <Typography>Log In</Typography>
        </Button>

        <Button className={styles.button}>
          <Typography>Sign Up</Typography>
        </Button>
      </Box>

      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID!}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </Box>
  );
}
