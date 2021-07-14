import { Book } from "./Book";
import { GodComment } from "./GodComment";
import { ReviewReaction } from "./ReviewReaction";
import { ReviewUpvote } from "./ReviewUpvote";
import SafeUser from "./SafeUser";

export interface GodReview {
  id: string;
  reviewer: SafeUser;
  book: Book;
  reviewUpvotes?: ReviewUpvote[];
  comments?: GodComment[];
  reviewReactions?: ReviewReaction[];
  rating: number;
  body: string;
}
