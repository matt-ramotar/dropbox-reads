import React, {FC} from 'react';

import { Grid, Typography } from "@material-ui/core";
import {GodBook} from "../../types/GodBook";
import styles from "./BookDetail.module.scss";
import { useLocation, useParams } from "react-router";
import {BookSummary} from "../../components/BookDetail/BookSummary";
import {BookComments} from "../../components/BookDetail/BookComments";
import {Upvotes} from "../../components/BookDetail/Upvotes";
import fetchGodBook from "../../lib/fetchGodBook";
import GlobalNav from "../../components/BookDetailNav/GlobalNav";
import SafeUser from "../../types/SafeUser";
import {Grid, Typography} from "@material-ui/core";
import {getFullName} from "../../helpers";
import BookTagChip from '../../components/BookTagChip';

export const BookDetail: FC<{user: SafeUser }> = (props) => {
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
        {/* <div className={styles.header}><GlobalNav user={props.user} /></div> */}
        <div className={styles.sidebar}>
          <Upvotes bookUpvotes={bookDetails.bookUpvotes ? bookDetails.bookUpvotes : []}/>
          <BookSummary bookDetails={bookDetails} />
        </div>
        <div className={styles.main}>

          <div className={styles.recc}>
            <Typography variant='h5'>Recommended by</Typography>
            {/*<Typography variant='subtitle2'>{getFullName(bookDetails.userAddedBy.firstName, bookDetails.userAddedBy.lastName)}</Typography>*/}
            {bookDetails.userAddedBy.picture ? <img className={styles.reccpic} src={bookDetails.userAddedBy.picture} alt="Recommended By"/> : null}
            <div>{getFullName(bookDetails.userAddedBy.firstName, bookDetails.userAddedBy.lastName)}</div>
          </div>
          <BookComments comments={bookDetails.bookComments} bookId={id} />
        </div>

        <div className={styles.bookTags}>
          <BookTagChip key={bookDetails.id} user={bookDetails.userAddedBy} book={bookDetails} />
        </div>
      </div>
    ) : null
  );
}
