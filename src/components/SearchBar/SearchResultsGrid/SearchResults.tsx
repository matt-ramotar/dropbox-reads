import { Box, Grid, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import SafeUser from "../../../types/SafeUser";
import styles from "./SearchResults.module.scss";
import { GodBook } from "../../../types/GodBook";
import BookCard from "../../BookCard";

interface Props {
  books: GodBook[];
}

export default function SearchResultsGrid(props: Props): JSX.Element {
  const [bookList, setBookList] = useState<GodBook[]>([]);

  useEffect(() => {
    try {
      setBookList(props.books);
    } catch (err) {
      console.log(err);
    }
  }, [props.books]);

  function RenderBooks(godBookArray: GodBook[]) {
    if (!godBookArray) return null;
    return bookList.map((book) => <BookCard key={book.id} book={book} />);
  }
  return <>{RenderBooks(props.books)}</>;
}
