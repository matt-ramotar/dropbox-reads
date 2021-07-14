export default function getFullName(first: string, last: string): string {
  const firstFormatted = first.charAt(0).toUpperCase() + first.slice(1);
  const lastFormatted = last.charAt(0).toUpperCase() + last.slice(1);
  return firstFormatted + " " + lastFormatted;
}
