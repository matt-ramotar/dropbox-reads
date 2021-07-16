import React, {FC} from 'react';
import { Grid, Typography } from "@material-ui/core";
import {GodBook} from "../../types/GodBook";
import styles from "./BookDetail.module.scss";
import { useLocation, useParams } from "react-router";
import {BookSummary} from "../../components/BookDetail/BookSummary";
import {BookComments} from "../../components/BookDetail/BookComments";
import {Upvotes} from "../../components/BookDetail/Upvotes";
import fetchGodBook from "../../lib/fetchGodBook";

export const BookDetail: FC<Record<string, unknown>> = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = React.useState<GodBook | null>(null);

    React.useEffect(() => {
      loadBookDetailsAsync(id);

      async function loadBookDetailsAsync(id: string) {
        try {
            const res = await fetchGodBook(id);
            setBookDetails(res);
        } catch (error) {
            console.log(error);
        }
      }
    }, [id, setBookDetails])

    React.useEffect(() => {
        console.log("book details are ", bookDetails)
    }, [bookDetails])

  return (
    // <Grid className={styles.grid}>
    bookDetails ? (
      <div>
        <div className={styles.sidebar}>
          <Upvotes bookUpvotes={bookDetails.bookUpvotes ? bookDetails.bookUpvotes : []}/>
          <BookSummary bookDetails={bookDetails} />
        </div>
        <div className={styles.main}>
          <BookComments comments={bookDetails.bookComments} bookId={id} />
        </div>
      </div>
    ) : <div></div>
  );
}
