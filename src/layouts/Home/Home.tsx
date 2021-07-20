import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import Nav from "../../components/Nav";
import SearchResults from "../../components/SearchResults/SearchResults";
import SideNav from "../../components/SideNav/SideNav";
import SubmitABookCta from "../../components/SubmitABookCta";
import SafeUser from "../../types/SafeUser";
import styles from "./Home.module.scss";

interface Props {
  user: SafeUser;
  pageName: string;
}

export default function Home(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/${props.pageName}`));

  return (
    <Grid container className={styles.root}>
      <Nav user={props.user} />
      <SearchResults />

      <Box className={styles.actions}>
        <SubmitABookCta user={props.user} />
      </Box>

      <Box className={styles.container}>
        <SideNav user={props.user} />
        <Box className={styles.main}>
          <Page user={props.user} />
        </Box>
      </Box>
    </Grid>
  );
}
