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
            <Typography variant="h6">By {getFullName(bookDetails.author!.firstName, bookDetails.author!.lastName)}</Typography>
            <Typography variant="h6">Recommended by {getFullName(bookDetails.userAddedBy.firstName, bookDetails.userAddedBy.lastName)}</Typography>
          </Grid>
          <Grid item xs className={styles.description}>
            <Grid item xs>
              <Typography variant="body1">{`${bookDetails.description}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
