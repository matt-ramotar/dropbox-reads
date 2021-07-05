import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import SafeUser from "../../types/SafeUser";
import styles from "./Nav.module.scss";

interface Props {
  user: SafeUser;
}

export default function Nav(props: Props): JSX.Element {
  return (
    <Grid container className={styles.root}>
      <Link to="/">
        <img src={logo} alt="Dropbox Reads logo" />
      </Link>
    </Grid>
  );
}
