import { Book } from "./Book";
import SafeUser from "./SafeUser";
import { Tag } from "./Tag";

export interface GodBookshelf {
  id: string;
  name: string;
  description: string;
  books?: Book[];
  user: SafeUser;
  tags?: Tag[];
}
