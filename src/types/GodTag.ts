import { Book } from "./Book";
import SafeUser from "./SafeUser";

export interface GodTag {
  id: string;
  tag: string;
  books?: Book[];
  users?: SafeUser[];
}
