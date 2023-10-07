import Link from 'next/link';
import { memo } from 'react';
import { IArtLocation } from '~/app/api/discord/gallery/galleryImages';
import { YEAR_RANGE } from '~/config';
import valueRange from '~/utils/valueRange';

interface IProps {
  sector: IArtLocation | undefined;
}

const YearRange = valueRange(YEAR_RANGE[0], YEAR_RANGE[1]).reverse();
function YearSidebar({ sector = 'main' }: IProps) {
  return (
    <>
      {YearRange.map(year => (
        <Link
          href={`/gallery/${year}/${sector}`}
          key={year}
          className='w-min text-3xl font-bold no-underline visited:text-inherit active:text-inherit max-md:rotate-90'
        >
          {year}
        </Link>
      ))}
    </>
  );
}

export default memo(YearSidebar);
