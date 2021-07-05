export default interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  picture: string | null;
  isLoggedIn: boolean | null;
}
