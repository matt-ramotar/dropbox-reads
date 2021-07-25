import { Action } from "./Action";
import { Reaction } from "./Reaction";
import SafeUser from "./SafeUser";

export interface GodActionReaction {
  id: string;
  action: Action;
  user: SafeUser;
  reaction: Reaction;
}
