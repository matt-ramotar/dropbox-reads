import { Typography } from "@material-ui/core";
import React, { FC } from 'react';
import { useParams } from "react-router";
import { BookComments } from "../../components/BookDetail/BookComments";
import { BookSummary } from "../../components/BookDetail/BookSummary";
import { Upvotes } from "../../components/BookDetail/Upvotes";
import BookTagChip from '../../components/BookTagChip';
import { getFullName } from "../../helpers";
import fetchGodBook from "../../lib/fetchGodBook";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import styles from "./BookDetail.module.scss";


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
