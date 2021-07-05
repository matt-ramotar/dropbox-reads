import { Grid, Typography } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./explore.module.scss";

export default function Explore({ user }: { user: SafeUser }): JSX.Element {
  return (
    <Grid className={styles.grid}>
      <Typography>Explore</Typography>
      <Typography>{`Hey, ${user.firstName} ${user.lastName}!`}</Typography>
      <Typography>{user.username}</Typography>
    </Grid>
  );
}
