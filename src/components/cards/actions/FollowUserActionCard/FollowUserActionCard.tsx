import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchGodUserById from "../../../../lib/fetchGodUserById";
import { Action } from "../../../../types/Action";
import { GodUser } from "../../../../types/GodUser";
import styles from "./FollowUserActionCard.module.scss";

interface Props {
  action: Action;
  user: GodUser;
}

export default function FollowUserActionCard(props: Props): JSX.Element | null {
  const [otherUser, setOtherUser] = useState<null | GodUser>(null);
  useEffect(() => {
    async function fetchGodUserByIdAsync() {
      const response = await fetchGodUserById(props.action.otherUserId!);
      setOtherUser(response);
    }

    fetchGodUserByIdAsync();
  }, [props.action.otherUserId]);

  if (!otherUser) return null;

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

            <Typography className={styles.text}>started following</Typography>

            <Link to={`/${otherUser.username}`}>
              <Typography className={styles.text_dynamic}>{`${otherUser.firstName} ${otherUser.lastName}`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
      </Box>

      <Box className={styles.main}>
        <Box className={styles.user_container}>
          <img src={otherUser.picture} alt={otherUser.username} className={styles.avatar} />

          <Box className={styles.otherUserInfo}>
            <Typography className={styles.text_dynamic}>{`${otherUser.firstName} ${otherUser.lastName}`}</Typography>
            <Typography>{otherUser.role?.role}</Typography>
            <Typography>{`${otherUser.usersFollowedBy?.length} ${
              otherUser.usersFollowedBy?.length === 1 ? `follower` : `followers`
            }`}</Typography>
          </Box>
        </Box>

        <Box className={styles.action}>
          <Button variant="contained">Follow</Button>
        </Box>
      </Box>
    </Grid>
  );
}
