import {
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from 'react-router-dom';
import book from '../../images/book.svg';
import SafeUser from "../../types/SafeUser";
import styles from "./SubmitABookCta.module.scss";




interface Props {
  user: SafeUser;
}

export default function SubmitABookCta(props: Props): JSX.Element {
  return (
    <Grid className={styles.root}>
      <Box className={styles.cta}>
        <Typography variant="h6" className={styles.heading}>We read better, together. Submit your book recommendations now!</Typography>
        <Box className={styles.book}>
          <img src={book} alt="book"/>
        </Box>

      </Box>


      <Link to="/add-book">
      <Box className={styles.button}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className={styles.icon}
            size="2x"
          />

          <Typography variant="h6" className={styles.button_text}>Submit a book</Typography>
      </Box>
      </Link>
    </Grid>
  );
}
