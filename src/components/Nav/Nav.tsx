import React from "react";
import { Grid, Button } from "@material-ui/core";
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
      <Link to="/add-book">
        <Button variant="outlined" size="large" color="primary">Add Book</Button>
      </Link>
    </Grid>
  );
}
