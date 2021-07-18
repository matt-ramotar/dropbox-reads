import { Book } from "./Book";
import { Bookshelf } from "./Bookshelf";
import { BookTag } from "./BookTag";
import { Comment } from "./Comment";
import { CommentReaction } from "./CommentReaction";
import { GodUser } from "./GodUser";
import { Review } from "./Review";
import { ReviewReaction } from "./ReviewReaction";
import { Tag } from "./Tag";

export interface GodAction {
  id: string;
  type: string;
  datetime: Date;
  user?: GodUser;
  otherUser?: GodUser;
  book?: Book;
  bookshelf?: Bookshelf;
  bookTag?: BookTag;
  tag?: Tag;
  review?: Review;
  comment?: Comment;
  otherComment?: Comment;
  reviewReaction?: ReviewReaction;
  commentReaction?: CommentReaction;
}
