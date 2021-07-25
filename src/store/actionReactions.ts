import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reaction } from "../types/Reaction";

interface ActionReactions {
  [actionId: string]: Reaction[];
}

interface Payload {
  actionId: string;
  reaction: Reaction;
}

const initialState: ActionReactions = {};

const actionReactionsSlice = createSlice({
  name: "actionReactions",
  initialState,
  reducers: {
    addActionReaction(state, action: PayloadAction<Payload>) {
      if (state[action.payload.actionId]) state[action.payload.actionId].push(action.payload.reaction);
      else state[action.payload.actionId] = [action.payload.reaction];
    },
  },
});

export const { addActionReaction } = actionReactionsSlice.actions;

export default actionReactionsSlice.reducer;
