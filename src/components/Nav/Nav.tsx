import { faBell, faBook, faCaretDown, faHashtag, faHome, faPlus, faSeedling, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid } from "@material-ui/core";
import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { Link } from "react-router-dom";
import { extractUsername } from "../../helpers";
import logo from "../../images/dropbox-transparent.png";
import { continueWithGoogle } from "../../lib";
import SafeUser from "../../types/SafeUser";
import { GOOGLE_CLIENT_ID } from "../../util/secrets";
import SearchBar from "../SearchBar";
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

    const { givenName: firstName, familyName: lastName, email, googleId, imageUrl: picture } = data.profileObj as ProfileObj;

    const username = extractUsername(email);

    const { token } = await continueWithGoogle(firstName, lastName, email, username, googleId, picture);

    localStorage.setItem("TOKEN", token);
    window.location.reload();
  };

  return (
    <Grid container className={styles.nav}>
      <Grid container className={styles.left}>
        <Grid>
          <Link to="/">
            <img src={logo} alt="Dropbox Reads logo" />
          </Link>
        </Grid>
        <Grid>
          <SearchBar />
        </Grid>
      </Grid>

      <Grid container className={styles.center}>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} size="2x" className={styles.icon} />
        </Link>

        <Link to="/feed">
          <FontAwesomeIcon icon={faSeedling} size="2x" className={styles.icon} />
        </Link>

        <Link to="/dropboxers">
          <FontAwesomeIcon icon={faUser} size="2x" className={styles.icon} />
        </Link>

        <Link to="/books">
          <FontAwesomeIcon icon={faBook} size="2x" className={styles.icon} />
        </Link>

        <Link to="/explore">
          <FontAwesomeIcon icon={faHashtag} size="2x" className={styles.icon} />
        </Link>
      </Grid>

      <Grid container className={styles.right}>
        <Box>
          {props.user ? null : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID ?? ""}
              buttonText="Continue with Google"
              onSuccess={handleLogin}
              onFailure={handleLogin}
              cookiePolicy={"single_host_origin"}
              className={styles.button}
            />
          )}
        </Box>

        <Box>
          {props.user.picture ? (
            <Link to={`/${props.user.username}`}>
              <img src={props.user.picture} alt={props.user.username} style={{ borderRadius: "50%" }} />
            </Link>
          ) : (
            <FontAwesomeIcon icon={faUser} size="lg" />
          )}
        </Box>

        <Link to="/settings">
          <Box className={styles.icon_circle}>
            <FontAwesomeIcon icon={faPlus} size="lg" className={styles.icon} />
          </Box>
        </Link>

        <Link to="/notifications">
          <Box className={styles.icon_circle}>
            <FontAwesomeIcon icon={faBell} size="lg" className={styles.icon} />
          </Box>
        </Link>

        <Link to="/settings">
          <Box className={styles.icon_circle}>
            <FontAwesomeIcon icon={faCaretDown} size="lg" className={styles.icon} />
          </Box>
        </Link>
      </Grid>
    </Grid>
  );
}
