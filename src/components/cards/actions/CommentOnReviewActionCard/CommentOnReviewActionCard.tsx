import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchGodComment from "../../../../lib/fetchGodComment";
import fetchGodReview from "../../../../lib/fetchGodReview";
import { Action } from "../../../../types/Action";
import { GodComment } from "../../../../types/GodComment";
import { GodReview } from "../../../../types/GodReview";
import { GodUser } from "../../../../types/GodUser";
import SafeUser from "../../../../types/SafeUser";
import styles from "./CommentOnReviewActionCard.module.scss";

interface Props {
  action: Action;
  mainUser: SafeUser;
  user: GodUser;
}

export default function CommentOnReviewActionCard(props: Props): JSX.Element | null {
  const [godComment, setGodComment] = useState<null | GodComment>(null);
  const [godReview, setGodReview] = useState<null | GodReview>(null);

  useEffect(() => {
    async function fetchGodCommentAsync() {
      const response = await fetchGodComment(props.action.commentId!);
      setGodComment(response);
    }

    fetchGodCommentAsync();
  }, [props.action.bookId]);

  useEffect(() => {
    async function fetchGodReviewAsync() {
      const response = await fetchGodReview(props.action.reviewId!);
      setGodReview(response);
    }

    fetchGodReviewAsync();
  }, [props.action.reviewId]);

  if (!godComment || !godReview) return null;

  return (
    <Grid className={styles.root}>
      <Box className={styles.about_container}>
        <Grid className={styles.about}>
          <Box className={styles.avatar}>
            <img src={props.user.picture} alt={props.user.username} className={styles.avatar} />
          </Box>
          <Box className={styles.header}>
            <Link to={`/${props.user.username}`}>
              <Typography className={styles.text_dynamic}>{`${props.user.firstName} ${props.user.lastName}`}</Typography>
            </Link>

            <Typography className={styles.text}>commented on</Typography>

            <Link to={`/${godReview.reviewer.username}`}>
              <Typography
                className={styles.text_dynamic_no_space}
              >{`${godReview.reviewer.firstName} ${godReview.reviewer.lastName}`}</Typography>
            </Link>

            <Typography style={{ marginRight: 5 }}>{`'s`}</Typography>

            <Link to={`/reviews/${godReview.id}`}>
              <Typography>{`review`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
        <Box className={styles.main}>
          <Box className={styles.review_container}>
            <img src={godReview.reviewer.picture!} alt={godReview.reviewer.username} className={styles.avatar} />

            <Box className={styles.otherUserInfo}>
              <Typography className={styles.text_dynamic}>{`${godReview.book.title}`}</Typography>
              <Rating value={godReview.rating} readOnly />
            </Box>

            <Box>
              <Link to={`/reviews/${godReview.id}`}>
                <Typography>View other comments</Typography>
              </Link>
            </Box>

            <Box className={styles.main_comment}>
              <img src={godComment.user.picture!} alt={godComment.user.username} />
              <Box className={styles.comment_info}>
                <Typography>{`${godComment.user.firstName} ${godComment.user.lastName}`}</Typography>
                <Typography>{godComment.body}</Typography>
              </Box>
            </Box>

            <Box className={styles.add_comment}>
              <img src={props.mainUser.picture!} alt={props.mainUser.username} />
              <Box className={styles.comment_info}>
                <TextField placeholder="Write a comment..." fullWidth InputProps={{ disableUnderline: true }}></TextField>
              </Box>
            </Box>
          </Box>

          <Box className={styles.action}>
            <Button variant="contained">Add</Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
