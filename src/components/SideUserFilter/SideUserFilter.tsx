import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import SafeUser from "../../types/SafeUser";
import UserCheckbox from '../UserCheckbox';
import styles from "./SideUserFilter.module.scss";

interface Props {
  users: SafeUser[]

}

export default function SideUserFilter(props: Props): JSX.Element {
  return (
    <Grid container className={styles.root}>
      <Typography variant='h6' className={styles.heading}>Filter by Dropboxer</Typography>
      <Grid className={styles.main}>


        <Box className={styles.tags}>
          {props.users.map(user => <UserCheckbox key={user.username} user={user}/>)}
        </Box>
      </Grid>
    </Grid>
  );
}
