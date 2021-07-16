import { GodBook } from "../types/GodBook";
import SafeUser from "../types/SafeUser";

export default function getUserInfo(books: GodBook[]): SafeUser[] {
  const users = books.map((book: GodBook) => book.userAddedBy);
  const unique = [];
  const isAdded: { [username: string]: boolean } = {};
  for (const user of users) {
    if (user.username in isAdded) continue;
    unique.push(user);
    isAdded[user.username] = true;
  }
  return unique;
}
