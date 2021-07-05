import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import Nav from "../../components/Nav";
import SideNav from "../../components/SideNav/SideNav";
import SafeUser from "../../types/SafeUser";
import styles from "./Main.module.scss";

interface Props {
  user: SafeUser;
  pageName: string;
}

export default function Main(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/${props.pageName}`));

  return (
    <Grid className={styles.root}>
      <Nav user={props.user} />

      <Box className={styles.container}>
        <SideNav user={props.user} />

        <Box className={styles.main}>
          <Page user={props.user} />
        </Box>
      </Box>
    </Grid>
  );
}
