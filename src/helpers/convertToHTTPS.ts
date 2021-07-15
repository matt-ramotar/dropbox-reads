export default function convertToHTTPS(url: string): string {
  return url.replace("http", "https");
}
