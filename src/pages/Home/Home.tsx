import { Grid, Typography } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./home.module.scss";

interface Props {
  user: SafeUser;
}

export default function Home(props: Props): JSX.Element {
  return (
    <Grid className={styles.grid}>
      <Typography>Home</Typography>
      <Typography>{`Hey, ${props.user.firstName} ${props.user.lastName}!`}</Typography>
      <Typography>{props.user.username}</Typography>
    </Grid>
  );
}
