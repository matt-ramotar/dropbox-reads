import React, {FC} from 'react';
import { Grid, Typography, Paper } from "@material-ui/core";
import {GodBook} from "../../types/GodBook";
import styles from "./BookDetail.module.scss";
import {getFullName} from "../../helpers";

interface BookSummaryProps {
  bookDetails: GodBook;
}

export const BookSummary: FC<BookSummaryProps> = ({bookDetails}) => {

  return (
    <div className={styles.root}>
      <div className={styles.outer} />
      <Grid container spacing={2}>
        {/*TODO: have fallback default book pic*/}
        <Grid container className={styles.inner}>
          <img src={bookDetails.coverImage} alt={"Book Cover"} />
          <Grid item xs>
            <Typography variant="h4">{bookDetails.title}</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2">By {getFullName(bookDetails.author!.firstName, bookDetails.author!.lastName)}</Typography>
            <Typography variant="subtitle2">Recommended by {getFullName(bookDetails.userAddedBy.firstName, bookDetails.userAddedBy.lastName)}</Typography>
          </Grid>
          <Grid item xs className={styles.description}>
            <Grid item xs>
              {/*  TODO: add description; it's not currently in godbook ..?*/}
              <Typography variant="body2">This is a book about a lot of things. The things range from this thing to that thing and it all ties back to another special thing.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
