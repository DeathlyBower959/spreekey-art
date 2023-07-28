export default function cleanURL(url: string) {
  const newUrl = new URL(url);
  newUrl.search = '';
  return newUrl.toString();
}
