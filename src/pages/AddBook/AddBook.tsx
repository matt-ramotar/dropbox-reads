import { Grid, Typography, CircularProgress, Snackbar } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./AddBook.module.scss";
import AddBookForm from "../../components/AddBookForm";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import Book from "../../components/Book";
import { useEffect, useState } from "react";
import { clearGoogleData, setFetchStatusToIdle, setSendToDBStatusToIdle } from "../../store/addBook";

export default function AddBook({ user }: { user: SafeUser }): JSX.Element {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.bookForm.googleData.items);
  const fetchStatus = useAppSelector((state) => state.bookForm.fetchStatus);
  const sendToDBStatus = useAppSelector((state) => state.bookForm.sendToDBStatus);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sendToDBStatus === "idle" || sendToDBStatus === "pending") {
      setShowMessage(false);
      return;
    }

    if (sendToDBStatus === "rejected") {
      setMessage("Darn...failed to add book ❌");
    }

    if (sendToDBStatus === "fulfilled") {
      setMessage("Success, woohoo! ✅");

      // reset the form back to its initial state
      dispatch(setFetchStatusToIdle());

      // book was successfully added so stop showing all the books
      dispatch(clearGoogleData());
    }

    setShowMessage(true);
  }, [sendToDBStatus]);

  function handleClose() {
    // stop showing message
    setShowMessage(false);

    // reset db status to 'idle'
    dispatch(setSendToDBStatusToIdle());
  }

  return (
    <>
      <div className={styles.infoDiv}>
        <Typography variant="h3" gutterBottom={true}>{`Hey, ${user.firstName}!`}</Typography>
        <Typography>What book would you like to recommend?</Typography>
        <Typography>Look for it here, and if you&apos;re lucky it&apos;ll show up below and you can pick the right one.</Typography>
      </div>
      <Grid container className={styles.formContainer}>
        <AddBookForm />
      </Grid>
      {fetchStatus === "pending" && (
        <div className={styles.progress}>
          <CircularProgress color="primary" />
        </div>
      )}
      {books ? (
        <Grid container className={styles.booksContainer} spacing={4}>
          {books
            // if there aren't any image links it usually means it's not a book
            // TODO: Remove duplicate books (they have the same id)
            .filter((book) => book.volumeInfo.imageLinks && book.volumeInfo.authors)
            .map((book, i) => (
              <Grid key={book.id + i} item xs={12} md={6} lg={4}>
                <Book bookData={book} user={user} />
              </Grid>
            ))}
        </Grid>
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showMessage}
        autoHideDuration={3000}
        message={message}
        onClose={handleClose}
      />
    </>
  );
}
