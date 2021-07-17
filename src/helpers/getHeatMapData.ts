import { Action } from "../types/Action";
import { Contribution } from "../types/Contribution";

interface Map {
  [date: string]: number;
}

export default function getHeatMapData(actions: Action[]): Contribution[] {
  const contributions = [];

  const map: Map = {};

  for (const action of actions) {
    if (map[action.datetime.toString()]) map[action.datetime.toString()] += 1;
    else map[action.datetime.toString()] = 1;
  }

  for (const [date, count] of Object.entries(map)) {
    contributions.push({ date: new Date(date), count });
  }

  return contributions;
}
