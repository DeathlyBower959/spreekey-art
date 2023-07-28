import { YEAR_RANGE } from '~/config';
import valueRange from '~/utils/valueRange';

export function generateStaticParams() {
  return valueRange(YEAR_RANGE[0], YEAR_RANGE[1]).map(year => ({
    year: year.toString(),
  }));
}

const dynamicParams = false;
export { dynamicParams };

export default function GalleryYearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
