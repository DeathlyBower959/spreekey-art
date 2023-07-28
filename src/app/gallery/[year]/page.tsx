import { redirect } from 'next/navigation';

export default function YearPage({
  params: { year },
}: {
  params: { year: string };
}) {
  redirect(`${year}/main`);
}
