import Image from 'next/image';
import { CSSProperties } from 'react';
import { IArt, IURLMode } from '~/utils/discord/gallery/galleryImages';

interface IProps {
  art: IArt;
  style?: CSSProperties;
}

const formatUrl = (art: IArt) =>
  `https://${
    art.mode === IURLMode.MEDIA ? 'media.discordapp.net' : 'cdn.discordapp.com'
  }/attachments/${art.url}`;

export default function GalleryImage({ art, style }: IProps) {
  return (
    <div className='relative' style={style}>
      <p className='absolute text-3xl text-red-500'>
        {art.month}/{art.day}
      </p>
      <Image
        src={formatUrl(art)}
        width={art.dims[0]}
        height={art.dims[1]}
        loading='eager'
        sizes='250px'
        alt={
          art.month
            ? `Art posted on: ${art.month}/${art.day}`
            : 'Art posted on: unknown'
        }
      />
    </div>
  );
}
