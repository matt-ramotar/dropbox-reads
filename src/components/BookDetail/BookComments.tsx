import React, {FC, useState} from 'react';
import { GodComment } from "../../types/GodComment";
import styles from "./BookDetail.module.scss";
import { Comment, Form } from 'semantic-ui-react'
import {getFullName} from "../../helpers";
import postComment from "../../lib/postComment";
import { AxiosResponse } from "axios";
import { Typography } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";

interface BookSummaryProps {
  comments?: GodComment[];
  bookId: string;
}

export const BookComments: FC<BookSummaryProps> = (props) => {
  const [formText, setFormText] = useState('');
  // Comments will include comments from props (derived from GodBook) as well as any newly posted comments.
  // Refactor to fetch updated comments instead of this workaround.
  const [allComments, setAllComments] = useState<GodComment[] | undefined>(undefined);

   const handleTextChange = (event: any) => {
     setFormText(event.target.value)
   }

   async function postCommentAsync(userId: string, bookId: string, commentBody: string) {
     try {
       const res: AxiosResponse = await postComment(userId, bookId, commentBody);
     } catch (error) {
       console.log(error);
     }
   }

   const handleSubmit = (event: any) => {
     // TODO: Replace hardcode with real logged in user data
     postCommentAsync("60ee057d77bfa300155bb3ec", props.bookId, formText)
     const user: SafeUser = {
       id: "",
       firstName: "Angela",
       lastName: "Chan",
       email: "",
       username: "",
       picture: "",
       isLoggedIn: true,
     }
     const newComment: GodComment = {
       id: "",
       user: user,
       body: formText,
     }
     allComments ? setAllComments(allComments.concat([newComment])) : setAllComments([newComment]);
     setFormText("");
     event.preventDefault()
   }

  React.useEffect(() => {
    if (props.comments) {
      setAllComments(props.comments);
    }
  }, [props.comments])

    // TODO: might need to replace with our own default image
    const defaultAvatarUrl = `https://react.semantic-ui.com/images/wireframe/square-image.png`
    return (
      <div className={styles.discussion}>
        <Typography variant='h5'>Discuss with other Dropboxers</Typography>
        <Comment.Group size='large'>
          {allComments ?
            allComments.map((comment: GodComment) => (
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
            <Form className={styles.commentform}>
              <Form.TextArea size='large' value={formText} onChange={handleTextChange}/>
              <Form.Button content='Post' labelPosition='left' icon='edit' onClick={handleSubmit} />
            </Form>
        </Comment.Group>
      </div>
    )
}
