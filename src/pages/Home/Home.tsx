import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookCard from "../../components/BookCard";
import DropboxReadsSpinner from "../../components/spinners/DropboxReadsSpinner";
import fetchBooks from "../../lib/fetchBooks";
import { RootState } from "../../store";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import styles from "./home.module.scss";

interface Props {
  user: SafeUser;
}

export default function Home(props: Props): JSX.Element {
  const filters = useSelector((state: RootState) => state.filters);
  const [books, setBooks] = useState<GodBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooksAsync() {
      const response = await fetchBooks();
      setBooks(response);
      setIsLoading(false);
    }

    fetchBooksAsync();
  }, []);

  if (!books || isLoading)
    return (
      <Box className={styles.loader}>
        <DropboxReadsSpinner isLoading={isLoading} />
      </Box>
    );

  return (
    // <Grid className={styles.root}>
    //   {filterBooks(books, Object.keys(filters)).map((book) => (
    //     <BookCard key={book.id} user={props.user} book={book} />
    //   ))}
    // </Grid>

    <Grid className={styles.root}>
      {books.map((book) => (
        <BookCard key={book.id} user={props.user} book={book} />
      ))}
    </Grid>
  );
}

function filterBooks(books: GodBook[], tagIds: string[]): GodBook[] {
  return books.filter((book: GodBook) => {
    const hasTag = (book: GodBook, tag: string) => {
      if (!book.bookTags) return false;
      for (const bookTag of book.bookTags) {
        if (bookTag.tag.tag.toLowerCase() === tag.toLowerCase()) {
          return true;
        }
      }
      return false;
    };

    for (const tagId of tagIds) {
      if (hasTag(book, tagId)) continue;
      else return false;
    }

    return true;
  });
}
