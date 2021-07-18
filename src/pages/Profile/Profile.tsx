import { faBook, faBookOpen, faFeather, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import FollowUserActionCard from "../../components/cards/actions/FollowUserActionCard";
import getHeatMapData from "../../helpers/getHeatMapData";
import { fetchUserProfile } from "../../lib";
import { Action } from "../../types/Action";
import { ActionType } from "../../types/ActionType";
import { GodUser } from "../../types/GodUser";
import SafeUser from "../../types/SafeUser";
import styles from "./profile.module.scss";

interface Props {
  user: SafeUser;
}

export default function Profile(props: Props): JSX.Element {
  const location = useLocation();
  const username = location.pathname.split("/")[1];

  const isRealUser = username === props.user.username;

  const [isLoading, setIsLoading] = useState(true);

  const [godUser, setGodUser] = useState<GodUser | null>(null);

  useEffect(() => {
    fetchUserProfileAsync(username);

    async function fetchUserProfileAsync(username: string) {
      try {
        const response = await fetchUserProfile(username);
        setGodUser(response);
        console.log(response);
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
    <Grid container className={styles.root}>
      <Grid className={styles.left}>
        <Box className={styles.profile_pic}>{godUser.picture ? <img src={godUser.picture} alt={godUser.username} /> : null}</Box>
        <Typography>{godUser.username}</Typography>
        <Box className={isRealUser ? styles.edit_profile_on : styles.edit_profile_off}>
          <Button className={styles.button} variant="contained" fullWidth>
            Edit Profile
          </Button>
        </Box>

        <Box className={styles.stats}>
          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <FontAwesomeIcon icon={faUsers} size="lg" className={styles.icon} />
            <Typography className={styles.label}>{`${godUser?.usersFollowedBy?.length ?? "0"} followers`}</Typography>
          </Link>

          <Typography>·</Typography>

          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <Typography className={styles.label}>{`${godUser?.usersFollowing?.length ?? "0"} following`}</Typography>
          </Link>

          <Typography>·</Typography>

          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <FontAwesomeIcon icon={faStar} size="lg" className={styles.icon} />
            <Typography className={styles.label}>{godUser.bookshelves?.length}</Typography>
          </Link>
        </Box>
      </Grid>

      <Grid className={styles.right}>
        <Grid className={styles.tabs}>
          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <FontAwesomeIcon icon={faBookOpen} size="lg" className={styles.icon} />
            <Typography className={styles.label}>Overview</Typography>
          </Link>

          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <FontAwesomeIcon icon={faBook} size="lg" className={styles.icon} />
            <Typography className={styles.label}>Bookshelves</Typography>
          </Link>

          <Link to={`/${godUser.username}/bookshelves`} className={styles.link}>
            <FontAwesomeIcon icon={faFeather} size="lg" className={styles.icon} />
            <Typography className={styles.label}>Reviews</Typography>
          </Link>
        </Grid>

        <Box className={styles.heatmap}>
          <CalendarHeatmap
            startDate={new Date("2021-01-01")}
            endDate={new Date()}
            values={getHeatMapData(godUser.actions!)}
            monthLabels={[]}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
          />
        </Box>

        <Grid className={styles.activity}>
          <Box className={godUser.actions ? styles.actions_on : styles.actions_off}>
            {godUser.actions
              ?.sort((a, b) => (a.datetime > b.datetime ? -1 : 1))
              .map((action: Action) => {
                if (action.type === ActionType.FollowUser) return <FollowUserActionCard action={action} user={godUser} key={action.id} />;
                if (action.type === ActionType.CreateBook) return <Typography>{action.bookId}</Typography>;
                if (action.type === ActionType.CreateBookshelf) return <Typography>{action.bookshelfId}</Typography>;
              })}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
