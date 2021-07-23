import { Grid, Typography } from "@material-ui/core";
import React from "react";
import styles from "./RecommendABook.module.scss";

export default function SuccessScene(): JSX.Element {
  return (
    <Grid className={styles.success__grid} direction="column" justify="center" alignItems="center">
      <Typography className={styles.success__text} variant="h4">
        {`You're on the waitlist!`}
      </Typography>

      <Typography className={styles.success__text} variant="h4">
        {`Keep an eye on your inbox for updates 📬`}
      </Typography>
    </Grid>
  );
}
