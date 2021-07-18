import { useState } from "react";
import { Comment } from "semantic-ui-react";
import { getFullName } from "../../../helpers";
import { GodComment } from "../../../types/GodComment";
import { DefaultAvatar } from "../../../util/defaults";
import styles from "./BookComment.module.scss";

interface Props {
  comment: GodComment;
}

export default function BookComment(props: Props): JSX.Element {
  const [src, setSrc] = useState(props.comment.user.picture!);

  const onError = () => {
    setSrc(DefaultAvatar);
  };

  return (
    <Comment key={props.comment.id}>
      <Comment.Avatar src={src} onError={onError} className={styles.avatar} />
      <Comment.Content>
        <Comment.Author>{getFullName(props.comment.user.firstName, props.comment.user.lastName)}</Comment.Author>
        <Comment.Text>{props.comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
