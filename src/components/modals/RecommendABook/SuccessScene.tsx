import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import styles from "./RecommendABook.module.scss";

export default function SuccessScene(): JSX.Element | null {
  const bookshelfBook = useSelector((state: RootState) => state.bookRec.bookshelfBook);
  const book = useSelector((state: RootState) => state.bookRec.book);
  if (!bookshelfBook) return null;

  return (
    <Grid className={styles.success__grid} direction="column" justify="center" alignItems="center">
      <Box className={styles.success__text__container}>
        <Typography className={styles.success__text} variant="h4">
          {`${book?.title ?? "It"} is now on your`}
          <Link to={`/i/bookshelves/${bookshelfBook.bookshelfId}`} className={styles.success__text__link}>
            <Typography className={styles.success__text} variant="h4">
              bookshelf
            </Typography>
          </Link>
          <span role="img" aria-label="open-book">
            ❤️
          </span>
        </Typography>
      </Box>

      <Box className={styles.success__text__container}>
        <Typography className={styles.success__text} variant="h4">
          {`Keep an eye on its`}
          <Link to={`/books/${bookshelfBook.bookId}`} className={styles.success__text__link}>
            <Typography className={styles.success__text} variant="h4">
              page
            </Typography>
          </Link>
          for updates
          <span role="img" aria-label="open-book">
            📖
          </span>
        </Typography>
      </Box>

      <Box className={styles.success__text__container}>
        <Typography className={styles.success__text} variant="h4">
          Contribute to its
          <Link to={book?.dropboxPaperUrl ?? ""} className={styles.success__text__link}>
            <Typography className={styles.success__text} variant="h4">
              Paper
            </Typography>
          </Link>
          summary
          <span role="img" aria-label="open-book">
            🧁
          </span>
        </Typography>
      </Box>
    </Grid>
  );
}
