import React, {FC} from 'react';
import { GodComment } from "../../types/GodComment";
import styles from "./BookDetail.module.scss";

interface BookSummaryProps {
  comments?: GodComment[];
}

export const BookComments: FC<BookSummaryProps> = (props) => {

    // TODO: add comment formatting
    return (
      <div className={styles.discussion}>
        <h4>Discuss with other Dropboxers</h4>
        {props.comments ?
          props.comments.map((comment: GodComment) =>
           <div key={comment.body}>{comment.body}</div>
          )
        : null}
      </div>
    )
}