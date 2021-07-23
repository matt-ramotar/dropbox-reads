import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resetTitle, setTitle } from "../../../store/bookRec";
import styles from "./RecommendABook.module.scss";

export default function TitleScene(): JSX.Element {
  const dispatch = useDispatch();

  const titleRedux = useSelector((state: RootState) => state.bookRec.title);
  const [titleLocal, setTitleLocal] = useState(titleRedux);

  useEffect(() => {
    if (titleLocal) dispatch(setTitle(titleLocal));

    if (!titleLocal && titleRedux) dispatch(resetTitle());
  }, [titleLocal]);

  return (
    <Box className={styles.root__question}>
      <Typography className={styles.prompt} variant="h4">
        {`What's the title? *`}
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="center">
        <TextField
          value={titleLocal}
          placeholder="The Rebel"
          className={styles["main__textField"]}
          onChange={(e) => setTitleLocal(e.target.value)}
        />
      </Grid>
    </Box>
  );
}
