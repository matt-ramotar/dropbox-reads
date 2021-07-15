import { Grid, Typography, CircularProgress } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./AddBook.module.scss";
import AddBookForm from "../../components/AddBookForm";
import { useAppSelector } from "../../util/hooks";
import Book from "../../components/Book";

export default function AddBook({ user }: { user: SafeUser }): JSX.Element {
  const books = useAppSelector((state) => state.bookForm.googleData.items);
  const fetchStatus = useAppSelector((state) => state.bookForm.fetchStatus);

  return (
    <>
      <div className={styles.infoDiv}>
        <Typography>{`Hey, ${user.firstName} ${user.lastName}!`}</Typography>
        <Typography>What book would you like to recommend?</Typography>
        <Typography>
          A list of books will be displayed and you can choose the correct one.
        </Typography>
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
            .filter((book) => book.volumeInfo.imageLinks)
            .map((book, i) => (
              <Grid key={book.id + i} item xs={12} md={6} lg={4}>
                <Book bookData={book} user={user} />
              </Grid>
            ))}
        </Grid>
      ) : null}
    </>
  );
}
