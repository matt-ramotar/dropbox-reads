import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Chip, Grid, Typography } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { GodBook } from "../../types/GodBook";
import { GodBookTag } from "../../types/GodBookTag";
import styles from "./BookSummary.module.scss";

interface BookSummaryProps {
  bookDetails: GodBook;
}

export const BookSummary: FC<BookSummaryProps> = ({ bookDetails }) => {
  const [tags, setTags] = useState<null | string[]>(null);
  const [isRecommended, setIsRecommended] = useState(false);

  const handleRecommend = () => setIsRecommended(!isRecommended);

  useEffect(() => {
    if (bookDetails.bookTags) setTags(getTags(bookDetails.bookTags));
    console.log(tags);
  }, []);

  return (
    <div className={styles.root}>
      <Grid className={styles.card}>
        <Box className={styles.actions}>
          <Button onClick={handleRecommend}>
            {isRecommended ? (
              <FontAwesomeIcon icon={faHeart} size="3x" className={styles.icon} />
            ) : (
              <FontAwesomeIcon icon={farHeart} size="3x" className={styles.icon} />
            )}
          </Button>

          <Button>
            <FontAwesomeIcon icon={faEllipsisV} size="3x" className={styles.icon} />
          </Button>
        </Box>
        {/*TODO: have fallback default book pic*/}
        <Grid container className={styles.cover}>
          <img src={bookDetails.coverImage} alt={"Book Cover"} />
        </Grid>
        <Grid className={styles.details}>
          <Typography variant="h4" className={styles.title}>
            {bookDetails.title}
          </Typography>
          <Typography variant="h6" className={styles.author}>
            {bookDetails.authors![0].name}
          </Typography>
        </Grid>

        <Grid className={styles.tags}>
          {tags?.map((tag) => (
            <Chip label={tag} key={tag} className={styles.chip} color="primary" />
          ))}
        </Grid>

        {/* <Grid item xs>
            <div dangerouslySetInnerHTML={{ __html: bookDetails.description }} />
          </Grid> */}
      </Grid>
    </div>
  );
};

function getTags(bookTags: GodBookTag[]): string[] {
  const tagsRes: string[] = [];
  const tagsMap: { [tag: string]: boolean } = {};

  for (const bookTag of bookTags) {
    const tags = bookTag.tag.tag.split(" / ");
    for (const tag of tags) {
      if (tag && tag in tagsMap === false) {
        if (tagsRes.length === 5) return tagsRes;
        tagsRes.push(tag);
        tagsMap[tag] = true;
      }
    }
  }

  return tagsRes;
}
