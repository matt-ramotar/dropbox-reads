import { Author } from "./Author";
import { Bookshelf } from "./Bookshelf";
import { BookTag } from "./BookTag";
import { BookUpvote } from "./BookUpvote";
import { GodComment } from "./GodComment";
import { Review } from "./Review";
import SafeUser from "./SafeUser";

export interface GodBook {
  id: string;
  googleId?: string;
  title: string;
  coverImage?: string;
  author?: Author;
  bookTags?: BookTag[];
  userAddedBy: SafeUser;
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  bookUpvotes?: BookUpvote[];
  bookComments?: GodComment[];
}
