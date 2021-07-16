import { Grid } from "@material-ui/core";
import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { Link } from "react-router-dom";
import { extractUsername } from "../../helpers";
import logo from "../../images/dropbox-reads-white.png";
import { continueWithGoogle } from "../../lib";
import SafeUser from "../../types/SafeUser";
import { GOOGLE_CLIENT_ID } from "../../util/secrets";
import styles from "./Nav.module.scss";



interface ProfileObj {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

interface Props {
  user: SafeUser;
}

export default function Nav(props: Props): JSX.Element {
  const handleLogin = async (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("code" in data) return;

    const {
      givenName: firstName,
      familyName: lastName,
      email,
      googleId,
      imageUrl: picture,
    } = data.profileObj as ProfileObj;

    const username = extractUsername(email);

    const { token } = await continueWithGoogle(
      firstName,
      lastName,
      email,
      username,
      googleId,
      picture
    );

    localStorage.setItem("TOKEN", token);
    window.location.reload();
  };


  return (
    <Grid container className={styles.root}>
      <Link to="/">
        <img src={logo} alt="Dropbox Reads logo" />
      </Link>

      {props.user ? null : (<GoogleLogin
          clientId={GOOGLE_CLIENT_ID ?? ""}
          buttonText="Continue with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
          className={styles.button}
        />)}


    </Grid>
  );
}
