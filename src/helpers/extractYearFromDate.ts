export default function extractYearFromDate(date: string): string {
  const d = new Date(date);
  return d.getFullYear().toString();
}
