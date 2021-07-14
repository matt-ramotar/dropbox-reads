import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchUserProfile } from "../../lib";
import { GodUser } from "../../types/GodUser";
import SafeUser from "../../types/SafeUser";
import styles from "./profile.module.scss";

interface Props {
  user: SafeUser;
}

export default function Profile(props: Props): JSX.Element {
  const location = useLocation();
  const username = location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(true);
  const [godUser, setGodUser] = useState<GodUser | null>(null);

  useEffect(() => {
    fetchUserProfileAsync(username);

    async function fetchUserProfileAsync(username: string) {
      try {
        const response = await fetchUserProfile(username);
        setGodUser(response);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, setGodUser, fetchUserProfile]);

  if (isLoading) {
    return (
      <Grid className={styles.grid}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  if (!godUser) {
    return (
      <Grid className={styles.grid}>
        <Typography>This account does not exist</Typography>
      </Grid>
    );
  }

  return (
    <Grid className={styles.root}>
      <Typography>Profile</Typography>
      {godUser.picture ? (
        <img src={godUser.picture} alt={godUser.username} />
      ) : null}
      <Typography>{godUser.username}</Typography>
    </Grid>
  );
}
