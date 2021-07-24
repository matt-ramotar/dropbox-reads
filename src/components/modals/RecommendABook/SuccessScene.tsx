import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import styles from "./RecommendABook.module.scss";

export default function SuccessScene(): JSX.Element | null {
  const bookshelfBook = useSelector((state: RootState) => state.bookRec.bookshelfBook);

  console.log(bookshelfBook);

  if (!bookshelfBook) return null;

  return (
    <Grid className={styles.success__grid} direction="column" justify="center" alignItems="center">
      <Typography className={styles.success__text} variant="h4">
        {`Your book's on the list!`}
      </Typography>

      <Box className={styles.success__text__container}>
        <Typography className={styles.success__text} variant="h4">
          Keep an eye on its
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
    </Grid>
  );
}
