import { Grid } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import SideFilter from "../SideFilter";
import SideUserFilter from "../SideUserFilter/SideUserFilter";
import styles from "./SideNav.module.scss";

interface Props {
  user: SafeUser;
  tags: Tag[];
  users: SafeUser[];
}

export default function SideNav(props: Props): JSX.Element {
  return (
    <Grid  className={styles.root}>


      <SideFilter tags={props.tags}/>

      <SideUserFilter users={props.users}/>


    </Grid>
  );
}
