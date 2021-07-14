import { Book } from "./Book";
import { BookTagUpvote } from "./BookTagUpvote";
import SafeUser from "./SafeUser";
import { Tag } from "./Tag";

export interface GodBookTag {
  id: string;
  book: Book;
  tag: Tag;
  userAddedBy: SafeUser;
  upvotes?: BookTagUpvote[];
}
