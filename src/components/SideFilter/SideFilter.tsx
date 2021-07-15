import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Tag } from "../../types/Tag";
import TagCheckbox from "../TagCheckbox";
import styles from "./SideFilter.module.scss";

interface Props {
  tags: Tag[];
}

export default function SideFilter(props: Props): JSX.Element {
  return (
    <Grid container className={styles.root}>
      <Typography variant='h6' className={styles.heading}>Filter by tags</Typography>
      <Grid className={styles.main}>


        <Box className={styles.tags}>
          {props.tags.map(tag => <TagCheckbox key={tag.tag} tag={tag} />)}
        </Box>
      </Grid>
    </Grid>
  );
}
