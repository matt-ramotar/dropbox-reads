import { Grid, Typography } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./home.module.scss";

export default function Home({ user }: { user: SafeUser }): JSX.Element {
  return (
    <Grid className={styles.grid}>
      <Typography>Home</Typography>
      <Typography>{`Hey, ${user.firstName} ${user.lastName}!`}</Typography>
      <Typography>{user.username}</Typography>
    </Grid>
  );
}
