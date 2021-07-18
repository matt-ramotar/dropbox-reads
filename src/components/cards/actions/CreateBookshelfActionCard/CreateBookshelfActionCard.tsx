import { Box, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import TagChip from "../../../../components/chips/TagChip";
import { GodAction } from "../../../../types/GodAction";
import { GodBookshelf } from "../../../../types/GodBookshelf";
import { GodUser } from "../../../../types/GodUser";
import styles from "./CreateBookshelfActionCard.module.scss";

interface Props {
  action: GodAction;
  user: GodUser;
  otherUser: GodUser;
}

export default function CreateBookshelfActionCard(props: Props): JSX.Element | null {
  const [godBookshelf, setGodBookshelf] = useState<null | GodBookshelf>(null);

  if (!props.action.bookshelf) return null;

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

            <Link to={`/i/bookshelves/${props.action.bookshelf!.id}`}>
              <Typography className={styles.text_dynamic}>{`${props.action.bookshelf!.name}`}</Typography>
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
            backgroundImage: `url(${props.action.bookshelf!.coverImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></Box>

        <Box>
          <img
            src={
              props.action.bookshelf!.mainImage ??
              "https://images.unsplash.com/photo-1599785209796-786432b228bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            }
            alt="cupcake"
            className={styles.mainImage}
          />
        </Box>
        <Box className={styles.bookshelf_container}>
          <Box className={styles.godBookshelfInfo}>
            <Box className={styles.header}>
              <Typography className={styles.text_dynamic}>{`${props.action.bookshelf!.name}`}</Typography>
              <Typography variant="caption" className={styles.text_dynamic_caption}>
                {props.action.bookshelf!.description}
              </Typography>
            </Box>
            <Box className={styles.chips}>
              {props.action.bookshelf!.tagIds?.map((tagId) => (
                <TagChip key={tagId} tagId={tagId} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
