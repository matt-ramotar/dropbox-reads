import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchGodBook from "../../../../lib/fetchGodBook";
import { GodAction } from "../../../../types/GodAction";
import { GodBook } from "../../../../types/GodBook";
import { GodUser } from "../../../../types/GodUser";
import styles from "./CreateBookActionCard.module.scss";

interface Props {
  action: GodAction;
  user: GodUser;
}

export default function CreateBookActionCard(props: Props): JSX.Element | null {
  const [godBook, setGodBook] = useState<null | GodBook>(null);
  useEffect(() => {
    async function fetchGodBookAsync() {
      const response = await fetchGodBook(props.action.book!.id!);
      console.log(response);
      setGodBook(response);
    }
    console.log(props);
    if (props.action.book?.id) fetchGodBookAsync();
  }, [props.action.book?.id]);

  if (!godBook) return null;

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

            <Typography className={styles.text}>recommended</Typography>

            <Link to={`/books/${godBook.id}`}>
              <Typography className={styles.text_dynamic}>{`${godBook.title.split(":")[0]}`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
      </Box>

      <Box
        className={styles.main}
        // style={{
        //   backgroundImage: `url(${godBook.coverImage})`,
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center center",
        // }}
      >
        <Box className={styles.user_container}>
          <img src={godBook.coverImage} alt={godBook.title} className={styles.avatar} />

          <Box className={styles.otherUserInfo}>
            <Typography className={styles.text_dynamic}>{`${godBook.title}`}</Typography>
            <Typography>{godBook.authors ? godBook.authors[0].name : null}</Typography>
          </Box>
        </Box>

        <Box className={styles.action}>
          <Button variant="contained">Add</Button>
        </Box>
      </Box>
    </Grid>
  );
}
