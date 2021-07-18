import { faBook, faBookOpen, faFeather, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import CreateBookActionCard from "../../components/cards/actions/CreateBookActionCard";
import CreateBookshelfActionCard from "../../components/cards/actions/CreateBookshelfActionCard";
import FollowUserActionCard from "../../components/cards/actions/FollowUserActionCard";
import DropboxReadsSpinner from "../../components/spinners/DropboxReadsSpinner";
import getHeatMapData from "../../helpers/getHeatMapData";
import { fetchUserProfile } from "../../lib";
import fetchFeed from "../../lib/fetchFeed";
import { ActionType } from "../../types/ActionType";
import { FeedType } from "../../types/FeedType";
import { GodAction } from "../../types/GodAction";
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

  const [godActions, setGodActions] = useState<GodAction[] | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchUserProfileAsync(username);

    async function fetchUserProfileAsync(username: string) {
      const response = await fetchUserProfile(username);
      setGodUser(response);
    }
  }, [username, setGodUser, fetchUserProfile]);

  useEffect(() => {
    async function fetchProfileFeedAsync() {
      const response = await fetchFeed(godUser!.id, FeedType.ProfileFeed, offset);

      setGodActions(response);
      setIsLoading(false);
    }

    if (godUser?.id) fetchProfileFeedAsync();
  }, [offset, setGodActions, godUser?.id]);

  if (isLoading) {
    return (
      <Box className={styles.loader}>
        <DropboxReadsSpinner isLoading={isLoading} />
      </Box>
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
        <Typography>{`@${godUser.username}`}</Typography>
        <Typography>{godUser.role?.role}</Typography>
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
          <Box className={godActions ? styles.actions_on : styles.actions_off}>
            {godActions?.map((action: GodAction) => {
              if (action.type === ActionType.FollowUser)
                return <FollowUserActionCard action={action} user={godUser} otherUser={action.otherUser!} key={action.id} />;
              if (action.type === ActionType.CreateBook) return <CreateBookActionCard action={action} user={godUser} key={action.id} />;
              if (action.type === ActionType.CreateBookshelf)
                return <CreateBookshelfActionCard action={action} user={godUser} otherUser={action.otherUser!} key={action.id} />;
              // if (action.type === ActionType.AddCommentToReview)
              //   return <CommentOnReviewActionCard action={action} user={godUser} mainUser={props.user} key={action.id} />;
              else return <Typography>{action.type}</Typography>;
            })}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
