import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchBooksFromGoogleBooksApi from "../../../lib/fetchBooksFromGoogleBooksApi";
import { RootState } from "../../../store";
import { setBook } from "../../../store/bookRec";
import { GoogleBook } from "../../../types/GoogleBook";
import GoogleBookCard from "./GoogleBookCard";
import styles from "./RecommendABook.module.scss";

export default function BookScene(): JSX.Element {
  const dispatch = useDispatch();

  const titleRedux = useSelector((state: RootState) => state.bookRec.title);
  const authorNameRedux = useSelector((state: RootState) => state.bookRec.authorName);
  const bookRedux = useSelector((state: RootState) => state.bookRec.book);

  const [bookLocal, setBookLocal] = useState(bookRedux);
  const [googleBooks, setGoogleBooks] = useState<GoogleBook[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookLocal) dispatch(setBook(bookLocal));
  }, [bookLocal]);

  useEffect(() => {
    async function fetchBooksFromGoogleBooksApiAsync() {
      const googleBooksResponse = await fetchBooksFromGoogleBooksApi(titleRedux!, authorNameRedux);
      setGoogleBooks(googleBooksResponse);
      setIsLoading(false);
    }
    if (titleRedux) fetchBooksFromGoogleBooksApiAsync();
  }, [titleRedux, authorNameRedux]);

  return (
    <Box className={styles.root__question}>
      <Typography className={styles.prompt} variant="h4">
        Select the version you want to recommend
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="center" className={styles.books}>
        {isLoading ? (
          <Typography>Loading</Typography>
        ) : googleBooks ? (
          googleBooks.map((googleBook) => <GoogleBookCard book={googleBook} key={googleBook.id} />)
        ) : (
          <Typography>No books found</Typography>
        )}
      </Grid>
    </Box>
  );
}
