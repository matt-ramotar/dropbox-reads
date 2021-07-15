import { GodBook } from "./GodBook";
import SafeUser from "./SafeUser";

export interface GodTag {
  id: string;
  tag: string;
  books?: GodBook[];
  users?: SafeUser[];
}
