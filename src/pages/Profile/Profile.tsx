import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchUserProfile } from "../../lib";
import SafeUser from "../../types/SafeUser";
import UserProfile from "../../types/UserProfile";
import styles from "./profile.module.scss";

interface Props {
  user: SafeUser;
}

export default function Profile(props: Props): JSX.Element {
  const location = useLocation();
  const username = location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUserProfileAsync(username);

    async function fetchUserProfileAsync(username: string) {
      try {
        const response = await fetchUserProfile(username);
        setUserProfile(response);
      } finally {
        setIsLoading(false);
      }
    }
  }, [username, setUserProfile, fetchUserProfile]);

  if (isLoading) {
    return (
      <Grid className={styles.grid}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  if (!userProfile) {
    return (
      <Grid className={styles.grid}>
        <Typography>This account does not exist</Typography>
      </Grid>
    );
  }

  return (
    <Grid className={styles.grid}>
      <Typography>Profile</Typography>
      {userProfile.safeUser.picture ? (
        <img src={userProfile.safeUser.picture} alt={userProfile.safeUser.username} />
      ) : null}
      <Typography>{userProfile.safeUser.username}</Typography>
    </Grid>
  );
}
