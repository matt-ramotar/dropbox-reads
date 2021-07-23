import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBook } from "../../../../store/bookRec";
import { GoogleBook } from "../../../../types/GoogleBook";
import styles from "./GoogleBookCard.module.scss";

interface Props {
  book: GoogleBook;
}

export default function GoogleBookCard(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const [thumbnailType, setThumbnailType] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  function getCoverImageSrc(): string {
    return `https://books.google.com/books/content?id=${props.book.id}&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api`;
  }

  useEffect(() => {
    if (props.book.volumeInfo.imageLinks) {
      if (props.book.volumeInfo.imageLinks.smallThumbnail) {
        setImageSrc(props.book.volumeInfo.imageLinks.smallThumbnail);
      }
    }
  }, []);

  const onClick = () => {
    dispatch(setBook(props.book));
  };

  return (
    <Button onClick={onClick} className={styles.button}>
      <Box className={styles.root}>
        {imageSrc ? <img src={imageSrc} alt={props.book.volumeInfo.title} /> : null}
        <Box className={styles.cover}></Box>

        <Grid className={styles.container}>
          <Box className={imageSrc ? styles.details_img : styles.details}>
            <Typography variant="h6" className={styles.title}>
              {props.book.volumeInfo.title}
            </Typography>
            <Typography variant="body2" className={styles.author}>
              {props.book.volumeInfo.authors ? props.book.volumeInfo.authors[0] : null}
            </Typography>

            <Typography variant="caption" className={styles.detail}>
              {props.book.volumeInfo.publishedDate?.split("-")[0]}
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Button>
  );
}
