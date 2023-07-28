export default function capitalize(string?: string) {
  if (!string || !string.trim()) return '';
  return string[0]?.toUpperCase() + string?.slice(1);
}
