import { Author } from "./Author";
import { Bookshelf } from "./Bookshelf";
import { GodBookTag } from "./GodBookTag";
import { BookUpvote } from "./BookUpvote";
import { GodComment } from "./GodComment";
import { Review } from "./Review";
import SafeUser from "./SafeUser";

export interface GodBook {
  id: string;
  googleId?: string;
  title: string;
  description: string;
  coverImage?: string;
  author?: Author;
  bookTags?: GodBookTag[];
  userAddedBy: SafeUser;
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  bookUpvotes?: BookUpvote[];
  bookComments?: GodComment[];
}
