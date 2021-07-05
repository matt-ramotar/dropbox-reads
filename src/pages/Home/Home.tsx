import { Grid, Typography } from "@material-ui/core";
import styles from "./home.module.scss";

export default function Home(props: any): JSX.Element {
  console.log(props);

  return (
    <Grid className={styles.grid}>
      <Typography>Home</Typography>
    </Grid>
  );
}
