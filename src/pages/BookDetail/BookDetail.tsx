import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { BookComments } from "../../components/BookDetail/BookComments";
import { BookSummary } from "../../components/BookDetail/BookSummary";
import DropboxReadsSpinner from "../../components/spinners/DropboxReadsSpinner";
import fetchGodBook from "../../lib/fetchGodBook";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import { DefaultAvatar } from "../../util/defaults";
import styles from "./BookDetail.module.scss";

interface Props {
  user: SafeUser;
}

export default function BookDetail(props: Props): JSX.Element | null {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<GodBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState(DefaultAvatar);

  useEffect(() => {
    loadBookDetailsAsync(id);

    async function loadBookDetailsAsync(id: string) {
      const res = await fetchGodBook(id);
      setBookDetails(res);
      setSrc(res.userAddedBy.picture!);
      setIsLoading(false);
    }
  }, [id, setBookDetails]);

  const onError = () => setSrc(DefaultAvatar);

  if (!bookDetails || !props.user)
    return (
      <Box className={styles.loader}>
        <DropboxReadsSpinner isLoading={isLoading} />
      </Box>
    );

  return bookDetails ? (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        {/* <Upvotes bookUpvotes={bookDetails.bookUpvotes ? bookDetails.bookUpvotes : []} /> */}
        <BookSummary bookDetails={bookDetails} />
      </div>
      <div className={styles.main}>
        <div className={styles.recc}>
          <Typography variant="h5">Recommended by</Typography>

          <Link to={`/${props.user.username}`}>
            <img src={src!} onError={onError} alt="Recommended By" />
          </Link>
        </div>
        <BookComments comments={bookDetails.bookComments} bookId={id} user={props.user} />
      </div>
    </div>
  ) : null;
}
