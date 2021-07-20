import { Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetQuery } from "../../../../store/search";
import { hideView } from "../../../../store/views";
import { Book } from "../../../../types/Book";
import { SearchResultsPopover } from "../../../../util/views";
import styles from "./BookSearchResult.module.scss";

interface Props {
  book: Book;
}

export default function BookSearchResult(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(resetQuery());
    dispatch(hideView(SearchResultsPopover));
    navigate(`/books/${props.book.id}`);
  };

  return (
    <Link to={`/books/${props.book.id}`} onMouseDown={onMouseDown}>
      <Grid className={styles.root}>
        <img src={props.book.coverImage} alt={props.book.title} />
        <Typography variant="body2" className={styles.title}>
          {props.book.title.split(":")[0]}
        </Typography>
      </Grid>
    </Link>
  );
}
