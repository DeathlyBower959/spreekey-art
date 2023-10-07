'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DiscordImagePathIDRegex,
  IArt,
  IDiscordImageID,
  IGalleryImages,
  ISectorKey,
} from '~/app/api/discord/gallery/galleryImages';
import Loader from '~/components/atoms/loaders/Loader';

interface IFetchedArt extends IArt {
  year: number;
  ID: IDiscordImageID;
  ratio: [number, number];
}

export default function ImagePage({
  params: { imageId },
}: {
  params: { imageId: string };
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [imageData, setImageData] = useState();

  useEffect(() => {
    async function main() {
      const GALLERY_IMAGES = (await fetch('/api/discord/gallery').then(res =>
        res.json()
      )) as IGalleryImages;
      let data: IFetchedArt | null = null;

      Object.keys(GALLERY_IMAGES).every(year =>
        Object.keys(GALLERY_IMAGES[parseInt(year)]).every(sector =>
          GALLERY_IMAGES[parseInt(year)][sector as ISectorKey]?.every(
            imageData => {
              if (
                imageData.url.match(DiscordImagePathIDRegex)?.[0] ===
                imageId?.split('-').join('/')
              ) {
                const ratio = imageData.dims;

                data = {
                  ...imageData,
                  year: parseInt(year),
                  sector,
                  ID: imageData.url.match(
                    DiscordImagePathIDRegex
                  )?.[0] as IDiscordImageID,
                  ratio,
                };
                return false;
              }

              return true;
            }
          )
        )
      );

      if (data) setImageData(data);
    }

    main();
  }, [imageId]);

  return (
    <div
      onClick={() => {
        router.push(pathname.substring(0, pathname.lastIndexOf('/')));
      }}
      className='pointer-events-none fixed left-0 top-0 flex h-screen w-screen animate-image_focus_overlay items-center justify-center bg-[#000000aa] opacity-0 max-md:top-20 max-md:h-[100vh_-_5rem]'
    >
      {/* Loader */}
      <div className='absolute left-1/2 -translate-x-1/2'>
        <Loader />
      </div>

      {JSON.stringify(imageData)}
      {/* <FocusedGalleryImage year={year} month={month} /> */}
    </div>
  );
}
