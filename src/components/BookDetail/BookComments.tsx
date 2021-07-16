import React, {FC} from 'react';
import { GodComment } from "../../types/GodComment";
import styles from "./BookDetail.module.scss";
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import {getFullName} from "../../helpers";
import postComment from "../../lib/postComment";
import axios, { AxiosResponse } from "axios";
import { Grid, Typography, Paper } from "@material-ui/core";

interface BookSummaryProps {
  comments?: GodComment[];
  bookId: string;
}

export const BookComments: FC<BookSummaryProps> = (props) => {

   async function postCommentAsync(userId: string, bookId: string, commentBody: string) {
     try {
       const res: AxiosResponse = await postComment(userId, bookId, commentBody);
     } catch (error) {
       console.log(error);
     }
   }

    // TODO: might need to replace with our own default image
    const defaultAvatarUrl = `https://react.semantic-ui.com/images/wireframe/square-image.png`
    return (
      <div className={styles.discussion}>
        <Typography variant='h5'>Discuss with other Dropboxers</Typography>
        <Comment.Group size='large'>
          {props.comments ?
            props.comments.map((comment: GodComment) => (
              <div key={comment.id}>
                <Comment>
                  <Comment.Avatar src={comment.user.picture ? comment.user.picture : defaultAvatarUrl} />
                  <Comment.Content>
                    <Comment.Author as='a'>{getFullName(comment.user.firstName, comment.user.lastName)}</Comment.Author>
                    <Comment.Text>{comment.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>)
            ) : "Leave a comment!"}
            <Form reply>
              <Form.TextArea size='large'/>
              {/*todo: get user id*/}
              <Form.Button content='Post' labelPosition='left' icon='edit' onClick={
                  () => postCommentAsync("1", props.bookId, "Comment abt book")}/>
            </Form>
        </Comment.Group>
      </div>
    )
}