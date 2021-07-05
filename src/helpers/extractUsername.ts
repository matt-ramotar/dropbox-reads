export default function extractUsername(email: string): string {
  return email.split("@")[0];
}
