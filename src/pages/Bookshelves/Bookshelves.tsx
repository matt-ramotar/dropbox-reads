import { Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AddBookshelfDialog from "../../components/AddBookshelfDialog";
import { fetchUserProfile } from "../../lib";
import { hideView, showView } from "../../store/views";
import { Bookshelf } from "../../types/Bookshelf";
import { GodUser } from "../../types/GodUser";
import SafeUser from "../../types/SafeUser";
import { Tag } from "../../types/Tag";
import { AddBookshelfDialog as AddBookshelfDialogId } from "../../util/views";
import styles from "./bookshelves.module.scss";

interface Props {
  user: SafeUser;
  tags: Tag[];
}

export default function BookshelvesPage(props: Props): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  const username = location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(true);
  const [godUser, setGodUser] = useState<GodUser | null>(null);
  const [isShowingAddBookshelfDialog, setIsShowingAddBookshelfDialog] = useState(false);

  const toggleAddBookshelfDialog = () => {
    if (!isShowingAddBookshelfDialog) dispatch(showView(AddBookshelfDialogId));
    else dispatch(hideView(AddBookshelfDialogId));
  };

  useEffect(() => {
    fetchUserProfileAsync(username);

    async function fetchUserProfileAsync(username: string) {
      try {
        const response = await fetchUserProfile(username);
        setGodUser(response);
        console.log(response);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, setGodUser, fetchUserProfile]);

  if (isLoading) {
    return (
      <Grid className={styles.grid}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  if (!godUser) {
    return (
      <Grid className={styles.grid}>
        <Typography>This account does not exist</Typography>
      </Grid>
    );
  }

  return (
    <Grid container className={styles.root}>
      <Typography>Bookshelves</Typography>

      <Button onClick={toggleAddBookshelfDialog}>
        <Typography>New Bookshelf</Typography>
      </Button>

      <AddBookshelfDialog user={props.user} tags={props.tags} />

      {godUser?.booksAdded?.map((book) => (
        <Typography key={book.title}>{book.title}</Typography>
      ))}

      {godUser.bookshelves?.map((bookshelf: Bookshelf) => (
        <Link to={`/i/bookshelves/${bookshelf.id}`} key={bookshelf.name}>
          <Typography>{bookshelf.name}</Typography>
        </Link>
      ))}
    </Grid>
  );
}
