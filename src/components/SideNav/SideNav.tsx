import { Grid } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import SideFilter from '../SideFilter';
import styles from "./SideNav.module.scss";

interface Props {
  user: SafeUser;
  tags: Tag[]
}

export default function SideNav(props: Props): JSX.Element {
  return (
    <Grid container className={styles.root}>


      <SideFilter tags={props.tags}/>


    </Grid>
  );
}
