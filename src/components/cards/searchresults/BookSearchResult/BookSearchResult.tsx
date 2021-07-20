import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Book } from "../../../../types/Book";
import styles from "./BookSearchResult.module.scss";

interface Props {
  book: Book;
}

export default function BookSearchResult(props: Props): JSX.Element {
  return (
    <Link to={`/books/${props.book.id}`} onMouseDown={(e) => e.preventDefault()}>
      <Grid className={styles.root}>
        <img src={props.book.coverImage} alt={props.book.title} />
        <Typography variant="body2" className={styles.title}>
          {props.book.title.split(":")[0]}
        </Typography>
      </Grid>
    </Link>
  );
}
