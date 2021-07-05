import { Box, Grid } from "@material-ui/core";
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
