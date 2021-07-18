import { Typography } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { CommentGroup, Form } from "semantic-ui-react";
import BookComment from "../../components/comments/BookComment";
import createComment from "../../lib/createComment";
import { GodComment } from "../../types/GodComment";
import SafeUser from "../../types/SafeUser";
import styles from "./BookDetail.module.scss";

interface Props {
  user: SafeUser;
  comments?: GodComment[];
  bookId: string;
}

export const BookComments: FC<Props> = (props) => {
  const [formText, setFormText] = useState("");
  // Comments will include comments from props (derived from GodBook) as well as any newly posted comments.
  const [comments, setComments] = useState<GodComment[] | null>(null);
  const [numComments, setNumComments] = useState(props.comments?.length ?? 0);

  const handleTextChange = (event: any) => {
    setFormText(event.target.value);
  };

  const handleCreateComment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newComment = await createComment(props.user.id, props.bookId, formText);

    const nextComments = comments ? [...comments, newComment] : [newComment];
    const nextNumComments = nextComments.length;

    setComments(nextComments);
    setNumComments(nextNumComments);
    setFormText("");
    event.preventDefault();
  };

  useEffect(() => {
    if (props.comments) setComments(props.comments);
  }, [props.comments]);

  return (
    <div className={styles.discussion}>
      <Typography variant="h5">Discuss with other Dropboxers</Typography>

      <CommentGroup className={styles.comments} size="large">
        {comments?.map((comment: GodComment) => (
          <BookComment key={comment.id} comment={comment} />
        ))}
        <Form className={styles.commentform}>
          <Form.TextArea size="large" value={formText} onChange={handleTextChange} />
          <Form.Button content="Post" labelPosition="left" icon="edit" onClick={handleCreateComment} />
        </Form>
      </CommentGroup>
    </div>
  );
};
