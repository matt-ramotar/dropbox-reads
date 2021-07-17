import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import Nav from "../../components/Nav";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import styles from "./Main.module.scss";

interface Props {
  user: SafeUser;
  pageName: string;
  tags: Tag[];
  books: GodBook[];
}

export default function Main(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/${props.pageName}`));
  return (
    <Grid className={styles.root}>
      <Nav user={props.user} />

      <Box className={styles.container}>
        <Box className={styles.main}>
          <Page user={props.user} books={props.books} tags={props.tags} />
        </Box>
      </Box>
    </Grid>
  );
}
