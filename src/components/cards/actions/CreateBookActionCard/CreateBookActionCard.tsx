import { faBookmark, faComment, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Chip, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fetchGodBook from "../../../../lib/fetchGodBook";
import { RootState } from "../../../../store";
import { GodAction } from "../../../../types/GodAction";
import { GodBook } from "../../../../types/GodBook";
import { GodUser } from "../../../../types/GodUser";
import { Reaction } from "../../../../types/Reaction";
import EmojiPopover from "../../../popovers/EmojiPopover";
import styles from "./CreateBookActionCard.module.scss";

interface Props {
  action: GodAction;
  user: GodUser;
}

export default function CreateBookActionCard(props: Props): JSX.Element | null {
  const [godBook, setGodBook] = useState<null | GodBook>(null);
  const [isVisibleReactions, setIsVisibleReactions] = useState(false);

  const [actionReactions, setActionReactions] = useState<Reaction[] | null>(null);

  const reactionsRedux = useSelector((state: RootState) => state.actionReactions[props.action.id]) ?? [];

  useEffect(() => {
    if (props.action.actionReactions) {
      const reactionsProps = props.action.actionReactions.map((actionReaction) => actionReaction.reaction);
      setActionReactions([...reactionsProps, ...reactionsRedux]);
    }
  }, [props.action.actionReactions, reactionsRedux.length]);

  useEffect(() => {
    async function fetchGodBookAsync() {
      const response = await fetchGodBook(props.action.book!.id!);
      console.log(response);
      setGodBook(response);
    }
    console.log(props);
    if (props.action.book?.id) fetchGodBookAsync();
  }, [props.action.book?.id]);

  if (!godBook) return null;

  const onFocus = () => setIsVisibleReactions(true);
  const onBlur = () => setIsVisibleReactions(false);

  return (
    <Grid className={styles.root} onMouseEnter={onFocus} onMouseDown={onFocus} onMouseLeave={onBlur}>
      <Box className={styles.about_container}>
        <Grid className={styles.about}>
          <Box className={styles.avatar}>
            <img src={props.user.picture} alt={props.user.username} className={styles.avatar} />
          </Box>
          <Box className={styles.header}>
            <Link to={`/${props.user.username}`}>
              <Typography className={styles.text_dynamic}>{`${props.user.firstName} ${props.user.lastName}`}</Typography>
            </Link>

            <Typography className={styles.text}>recommended</Typography>

            <Link to={`/books/${godBook.id}`}>
              <Typography className={styles.text_dynamic}>{`${godBook.title.split(":")[0]}`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
      </Box>

      <Box className={styles.main}>
        <Box className={styles.user_container}>
          <img src={godBook.coverImage} alt={godBook.title} className={styles.avatar} />

          <Box className={styles.otherUserInfo}>
            <Typography className={styles.text_dynamic}>{`${godBook.title}`}</Typography>
            <Typography>{godBook.authors ? godBook.authors[0].name : null}</Typography>
          </Box>
        </Box>

        <Box className={styles.action}>
          <Button variant="contained">Add</Button>
        </Box>
      </Box>

      <Box className={isVisibleReactions ? styles.reactions : styles.reactions_hidden}>
        <EmojiPopover size="lg" actionId={props.action.id} userId={props.user.id} />

        <Button>
          <FontAwesomeIcon icon={faComment} size="lg" />
        </Button>

        <Button>
          <FontAwesomeIcon icon={faShareSquare} size="lg" />
        </Button>

        <Button>
          <FontAwesomeIcon icon={faBookmark} size="lg" />
        </Button>

        <Button>
          <FontAwesomeIcon icon={faEllipsisV} size="lg" />
        </Button>
      </Box>

      <Box className={styles.emojis}>
        {actionReactions?.map((reaction) => (
          <Chip key={reaction.id} label={reaction.native} className={styles.emoji} />
        ))}
      </Box>
    </Grid>
  );
}
