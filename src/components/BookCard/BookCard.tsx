import { faEllipsisV, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { GodBook } from "../../types/GodBook";
import SafeUser from "../../types/SafeUser";
import styles from "./BookCard.module.scss";

interface Props {
  user: SafeUser;
  book: GodBook;
}

export default function BookCard(props: Props): JSX.Element {
  return (
    <Grid className={styles.root} component={Link} to={`/books/${props.book.id}`}>
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
          {props.book.authors ? props.book.authors[0].name : `${props.book.authors![0].firstName} ${props.book.authors![0].lastName}`}
        </Typography>

        <Box className={styles.user_details}>
          <img src={props.book.userAddedBy.picture!} alt={props.book.userAddedBy.username} />
          <Typography variant="caption">{`${props.book.userAddedBy.username}@`}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}
