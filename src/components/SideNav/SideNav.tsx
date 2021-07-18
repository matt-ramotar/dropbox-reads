import { Grid } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import SideFilter from "../SideFilter";
import styles from "./SideNav.module.scss";

interface Props {
  user: SafeUser;
}

export default function SideNav(props: Props): JSX.Element {
  return (
    <Grid className={styles.root}>
      <SideFilter />
    </Grid>
  );
}
