import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SafeUser from "../../types/SafeUser";
import styles from "./SideNav.module.scss";

interface Props {
  user: SafeUser;
}

export default function SideNav(props: Props): JSX.Element {
  return (
    <Grid container className={styles.root}>
      <Link to="/home">
        <Typography>Home</Typography>
      </Link>

      <Link to="/explore">
        <Typography>Explore</Typography>
      </Link>

      <Link to={`/${props.user.username}`}>
        <Typography>Profile</Typography>
      </Link>
    </Grid>
  );
}
