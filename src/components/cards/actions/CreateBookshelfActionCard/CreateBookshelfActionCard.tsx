import { Box, Chip, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchGodBookshelf from "../../../../lib/fetchGodBookshelf";
import { Action } from "../../../../types/Action";
import { GodBookshelf } from "../../../../types/GodBookshelf";
import { GodUser } from "../../../../types/GodUser";
import styles from "./CreateBookshelfActionCard.module.scss";

interface Props {
  action: Action;
  user: GodUser;
}

export default function CreateBookshelfActionCard(props: Props): JSX.Element | null {
  const [godBookshelf, setGodBookshelf] = useState<null | GodBookshelf>(null);
  useEffect(() => {
    async function fetchGodBookshelfByIdAsync() {
      const response = await fetchGodBookshelf(props.action.bookshelfId!);
      setGodBookshelf(response);
      console.log(response);
    }

    fetchGodBookshelfByIdAsync();
  }, [props.action.bookshelfId]);

  if (!godBookshelf) return null;

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

            <Typography className={styles.text}>created</Typography>

            <Link to={`/i/bookshelves/${godBookshelf.id}`}>
              <Typography className={styles.text_dynamic}>{`${godBookshelf.name}`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
      </Box>

      <Box className={styles.content}>
        <Box
          className={styles.cover}
          style={{
            backgroundImage: `url(${godBookshelf.coverImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></Box>

        <Box>
          <img
            src={
              godBookshelf.mainImage ??
              "https://images.unsplash.com/photo-1599785209796-786432b228bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            }
            alt="cupcake"
            className={styles.mainImage}
          />
        </Box>
        <Box className={styles.bookshelf_container}>
          <Box className={styles.godBookshelfInfo}>
            <Box className={styles.header}>
              <Typography className={styles.text_dynamic}>{`${godBookshelf.name}`}</Typography>
              <Typography variant="caption" className={styles.text_dynamic_caption}>
                {godBookshelf.description}
              </Typography>
            </Box>
            <Box className={styles.chips}>
              {godBookshelf.tags?.map((tag) => (
                <Chip label={tag.tag} key={tag.id} size="small" className={styles.chip} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
