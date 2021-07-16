import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import Nav from "../../components/Nav";
import SearchBar from "../../components/SearchBar";
import SideNav from "../../components/SideNav/SideNav";
import SubmitABookCta from "../../components/SubmitABookCta";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import styles from "./Home.module.scss";
import { useState } from "react";

interface Props {
  user: SafeUser;
  pageName: string;
  tags: Tag[];
  books: GodBook[];
}

export default function Home(props: Props): JSX.Element {
  const [books, setBooks] = useState<GodBook[]>(props.books);
  const Page = loadable(() => import(`../../pages/${props.pageName}`));

  function handleSearch(books: GodBook[]) {
    setBooks(books);
  }

  return (
    <Grid container className={styles.root}>
      <Nav user={props.user} />
      <SubmitABookCta user={props.user} />
      <SearchBar handleSearch={handleSearch} />

      <Box className={styles.container}>
        <SideNav user={props.user} tags={props.tags} />
        <Box className={styles.main}>
          <Page user={props.user} books={books} />
        </Box>
      </Box>
    </Grid>
  );
}
