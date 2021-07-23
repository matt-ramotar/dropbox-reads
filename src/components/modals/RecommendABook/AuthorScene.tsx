import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuthorName } from "../../../store/bookRec";
import styles from "./RecommendABook.module.scss";

export default function AuthorScene(): JSX.Element {
  const dispatch = useDispatch();

  const authorNameRedux = useSelector((state: RootState) => state.bookRec.authorName);
  const [authorNameLocal, setAuthorNameLocal] = useState(authorNameRedux);

  useEffect(() => {
    if (authorNameLocal) dispatch(setAuthorName(authorNameLocal));
  }, [authorNameLocal]);

  return (
    <Box className={styles.root__question}>
      <Typography className={styles.prompt} variant="h4">
        {`Who's the author?`}
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="center">
        <TextField
          value={authorNameLocal}
          placeholder="Albert Camus"
          className={styles["main__textField"]}
          onChange={(e) => setAuthorNameLocal(e.target.value)}
        />
      </Grid>
    </Box>
  );
}
