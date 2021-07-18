import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import CreateBookActionCard from "../../components/cards/actions/CreateBookActionCard";
import FollowUserActionCard from "../../components/cards/actions/FollowUserActionCard";
import fetchFeed from "../../lib/fetchFeed";
import { ActionType } from "../../types/ActionType";
import { FeedType } from "../../types/FeedType";
import { GodAction } from "../../types/GodAction";
import SafeUser from "../../types/SafeUser";
import styles from "./feed.module.scss";

interface Props {
  user: SafeUser;
}

export default function FeedPage(props: Props): JSX.Element | null {
  const [feed, setFeed] = useState<GodAction[] | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchFeedAsync() {
      const response = await fetchFeed(props.user.id, FeedType.MainFeed, offset);
      console.log(response);
      setFeed(response);
    }

    fetchFeedAsync();
  }, [props.user.id]);

  if (!feed) return null;

  return (
    <Grid className={styles.root}>
      {feed.map((action) => {
        if (action.type === ActionType.FollowUser)
          return <FollowUserActionCard action={action} user={action.user!} otherUser={action.otherUser!} key={action.id} />;

        if (action.type === ActionType.CreateBook) return <CreateBookActionCard action={action} user={action.user!} key={action.id} />;
        else return <Typography key={action.id}>{action.type}</Typography>;
      })}
    </Grid>
  );
}
