import { CommentReaction } from "./CommentReaction";
import { CommentUpvote } from "./CommentUpvote";
import { Review } from "./Review";
import SafeUser from "./SafeUser";

export interface GodComment {
  id: string;
  user: SafeUser;
  review?: Review;
  parentComment?: GodComment;
  childrenComments?: GodComment[];
  body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
}
