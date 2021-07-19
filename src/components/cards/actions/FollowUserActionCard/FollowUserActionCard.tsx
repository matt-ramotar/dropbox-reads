import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GodAction } from "../../../../types/GodAction";
import { GodUser } from "../../../../types/GodUser";
import { DefaultAvatar } from "../../../../util/defaults";
import styles from "./FollowUserActionCard.module.scss";

interface Props {
  action: GodAction;
  user: GodUser;
  otherUser: GodUser;
}

export default function FollowUserActionCard(props: Props): JSX.Element | null {
  const [imageSrc, setImageSrc] = useState(props.user.picture);
  const [otherUserImageSrc, setOtherUserImageSrc] = useState(props.otherUser.picture);

  const onErrorOtherUser = () => setOtherUserImageSrc(DefaultAvatar);
  const onError = () => setImageSrc(DefaultAvatar);

  return (
    <Grid className={styles.root}>
      <Box className={styles.about_container}>
        <Grid className={styles.about}>
          <Box className={styles.avatar}>
            <img src={imageSrc!} onError={onError} alt={props.user.username} className={styles.avatar} />
          </Box>
          <Box className={styles.header}>
            <Link to={`/${props.user.username}`}>
              <Typography className={styles.text_dynamic}>{`${props.user.firstName} ${props.user.lastName}`}</Typography>
            </Link>

            <Typography className={styles.text}>started following</Typography>

            <Link to={`/${props.otherUser.username}`}>
              <Typography className={styles.text_dynamic}>{`${props.otherUser.firstName} ${props.otherUser.lastName}`}</Typography>
            </Link>
          </Box>
          <Box className={styles.datetime}>
            <Typography className={styles.timestamp}>{new Date(props.action.datetime).toLocaleDateString()}</Typography>
          </Box>
        </Grid>
      </Box>

      <Box className={styles.main}>
        <Box className={styles.user_container}>
          <img src={otherUserImageSrc!} onError={onErrorOtherUser} alt={props.otherUser.username} className={styles.avatar} />

          <Box className={styles.otherUserInfo}>
            <Typography className={styles.text_dynamic}>{`${props.otherUser.firstName} ${props.otherUser.lastName}`}</Typography>
            <Typography>{props.otherUser.role?.role}</Typography>
            <Typography>{`${props.otherUser.usersFollowedBy?.length} ${
              props.otherUser.usersFollowedBy?.length === 1 ? `follower` : `followers`
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
