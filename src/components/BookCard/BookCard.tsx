import { faEllipsisV, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import styles from "./BookCard.module.scss";

interface Props {
  user: SafeUser;
  book: GodBook;
}

export default function BookCard(props: Props): JSX.Element {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  return (
    <Grid className={styles.root}>
      <Box className={styles.top_box}>
        <Box className={styles.left}>
          <FontAwesomeIcon icon={faHeart} className={styles.icon} size="lg" />
          <Typography variant="h4" className={styles.num_upvotes}>
            {Math.floor(Math.random() * 30) + 1}
          </Typography>
        </Box>
        <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} size="lg" />
      </Box>

      <img src={props.book.coverImage} alt={props.book.title} />

      <Box className={styles.details}>
        <Typography variant="h5">{props.book.title}</Typography>

        <Typography variant="h6" className={styles.author}>
          {props.book.author!.name ?? `${props.book.author!.firstName} ${props.book.author!.lastName}`}
        </Typography>

        <Box className={styles.user_details}>
          <img src={props.book.userAddedBy.picture!} alt={props.book.userAddedBy.username}/>
          <Typography variant="caption">{`${props.book.userAddedBy.username}@`}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}
