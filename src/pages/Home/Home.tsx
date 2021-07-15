import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import BookCard from "../../components/BookCard";
import { RootState } from "../../store";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import styles from "./home.module.scss";

interface Props {
  user: SafeUser;
  books: GodBook[];
}

export default function Home(props: Props): JSX.Element {
  const filters = useSelector((state: RootState) => state.filters)

  return (
    <Grid className={styles.root}>
      {filterBooks([...props.books, ...props.books], Object.keys(filters)).map(book => <BookCard key={book.id} user={props.user} book={book}/>)}
    </Grid>
  );
}

function filterBooks(books: GodBook[], tagIds: string[]): GodBook[] {
  return books.filter((book: GodBook) => {
    const hasTag = (book: GodBook, tag: string) => {
      if (!book.bookTags) return false
      for (const bookTag of book.bookTags) {
        if (bookTag.tag && bookTag.tag.id === tag) return true
      }
      return false
    }

    for (const tagId of tagIds) {
      if (hasTag(book, tagId)) continue
      else return false
    }

    return true
  })
}
