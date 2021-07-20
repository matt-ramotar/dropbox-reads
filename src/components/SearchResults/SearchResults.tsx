import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookSearchResult from "../../components/cards/searchresults/BookSearchResult";
import fetchBooks from "../../lib/fetchBooks";
import { RootState } from "../../store";
import { Book } from "../../types/Book";
import styles from "./SearchResults.module.scss";

interface Matches {
  title?: Book[];
}

export default function SearchResults(): JSX.Element | null {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [matchingBooks, setMatchingBooks] = useState<Book[] | null>(null);

  const query = useSelector((state: RootState) => state.search.query);
  const shouldShow = useSelector((state: RootState) => state.views.SearchResultsPopover);

  useEffect(() => {
    async function prefetchBooksAsync() {
      const response = await fetchBooks();
      setBooks(response);
      console.log(response);
    }
    prefetchBooksAsync();
  }, []);

  useEffect(() => {
    if (books && query) {
      const matchingBooksResult = getMatchingBooks(books, query);
      setMatchingBooks(matchingBooksResult.title ?? null);
    }
  }, [query]);

  if (!shouldShow) return null;

  if (shouldShow && !books)
    return (
      <Box className={styles.root_loading} boxShadow={1}>
        <Typography>Loading Results</Typography>
      </Box>
    );

  return (
    <Box className={styles.root} boxShadow={1}>
      {matchingBooks?.map((matchingBook) => (
        <BookSearchResult key={matchingBook.id} book={matchingBook} />
      ))}
    </Box>
  );
}

function getMatchingBooks(books: Book[], query: string): Matches {
  const title = [];

  for (const book of books) {
    if (title.length === 10) break;
    if (book.title.toLowerCase().includes(query.toLowerCase())) title.push(book);
  }

  return { title };
}
