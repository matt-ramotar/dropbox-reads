import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GodUser } from "../../../types/GodUser";
import styles from "./DropboxerCard.module.scss";

interface Props {
  user: GodUser;
}
export default function DropboxerCard(props: Props): JSX.Element {
  const [src, setSrc] = useState(props.user.picture);

  const onError = () => {
    setSrc("https://dropbox-appbox-static.s3.amazonaws.com/static/dropabout/img/nophoto.png");
  };
  return (
    <Grid className={styles.root}>
      <Link to={`/${props.user.username}`}>
        <img src={src} onError={onError} alt={props.user.username} />
      </Link>
      <Typography>{`${props.user.firstName} ${props.user.lastName}`}</Typography>
      <Typography variant="caption">{props.user.role?.role}</Typography>
    </Grid>
  );
}
