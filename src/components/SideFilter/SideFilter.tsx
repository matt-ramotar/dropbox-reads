import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import fetchTags from "../../lib/fetchTags";
import { Tag } from "../../types/Tag";
import DropboxReadsClipLoader from "../spinners/DropboxReadsClipLoader";
import TagCheckbox from "../TagCheckbox";
import styles from "./SideFilter.module.scss";

export default function SideFilter(): JSX.Element | null {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTagsAsync() {
      const response = await fetchTags();
      console.log(response);
      setTags(response);
      setIsLoading(false);
    }
    fetchTagsAsync();
  }, []);

  if (isLoading || !tags)
    return (
      <Box className={styles.loader}>
        <DropboxReadsClipLoader isLoading={isLoading} />
      </Box>
    );

  return (
    <Grid container className={styles.root}>
      <Typography variant="h6" className={styles.heading}>
        Filter by tags
      </Typography>
      <Grid className={styles.main}>
        <Box className={styles.tags}>
          {tags.map((tag) => (
            <TagCheckbox key={tag.tag} tag={tag} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
