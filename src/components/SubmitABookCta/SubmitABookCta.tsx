import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import book from "../../images/book.svg";
import { showView } from "../../store/views";
import SafeUser from "../../types/SafeUser";
import { RecommendABookModal } from "../../util/views";
import styles from "./SubmitABookCta.module.scss";

interface Props {
  user: SafeUser;
}

export default function SubmitABookCta(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const onClick = () => dispatch(showView(RecommendABookModal));

  return (
    <Grid className={styles.root}>
      <Box className={styles.cta}>
        <Typography variant="h6" className={styles.heading}>
          We read better, together. Submit your book recommendations now!
        </Typography>
        <Box className={styles.book}>
          <img src={book} alt="book" />
        </Box>
      </Box>

      <Button onClick={onClick}>
        <Box className={styles.button}>
          <FontAwesomeIcon icon={faPlusCircle} className={styles.icon} size="2x" />

          <Typography variant="h6" className={styles.button_text}>
            Submit a book
          </Typography>
        </Box>
      </Button>
    </Grid>
  );
}
