import { BookRec } from "../store/bookRec";

export default function getNumBookRecScenesCompleted(bookRec: BookRec): number {
  return Object.entries(bookRec).reduce((numCompleted: number, [key, value]: [string, string]) => {
    if (Boolean(value) && (key === "title" || key === "book" || key === "reason")) numCompleted += 1;
    return numCompleted;
  }, 0);
}
