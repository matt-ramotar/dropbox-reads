import { Box, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { resetReason, setReason } from "../../../store/bookRec";
import styles from "./RecommendABook.module.scss";

export default function ReasonScene(): JSX.Element {
  const dispatch = useDispatch();

  const reasonRedux = useSelector((state: RootState) => state.bookRec.reason);
  const [reasonLocal, setReasonLocal] = useState(reasonRedux);

  useEffect(() => {
    if (reasonLocal) dispatch(setReason(reasonLocal));

    if (!reasonLocal && reasonRedux) dispatch(resetReason());
  }, [reasonLocal]);

  return (
    <Box className={styles.root__question}>
      <Typography className={styles.prompt} variant="h4">
        {`In a few words? *`}
      </Typography>

      <Grid container direction="row" justify="flex-start" alignItems="center">
        <TextField
          value={reasonLocal}
          placeholder={`"Real generosity towards the future lies in giving all to the present"`}
          className={styles["main__textField"]}
          onChange={(e) => setReasonLocal(e.target.value)}
        />
      </Grid>
    </Box>
  );
}
