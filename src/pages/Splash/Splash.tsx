import { Box, Button, Typography } from "@material-ui/core";
import logo from "../../images/logo.png";
import splash from "../../images/splash.png";
import styles from "./splash.module.scss";

export default function Splash(): JSX.Element {
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
    </Box>
  );
}
