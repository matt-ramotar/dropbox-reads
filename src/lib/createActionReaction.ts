import axios from "axios";
import { BaseEmoji } from "emoji-mart";
import { GodActionReaction } from "../types/GodActionReaction";
import { CREATE_ACTION_REACTION, VERSION } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export default async function createActionReaction(actionId: string, emoji: BaseEmoji, userId: string): Promise<GodActionReaction> {
  const result = await axios.post(buildUrl(), {
    actionId,
    userId,
    reaction: { native: emoji.native, name: emoji.name, colons: emoji.colons, skin: emoji.skin, isCustom: false },
  });
  return result.data;
}

function buildUrl(): string {
  return API_URL + VERSION + CREATE_ACTION_REACTION;
}
