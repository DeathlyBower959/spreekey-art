'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useDoubleTap } from 'use-double-tap';
// Types
import { IDiscordImageURL } from '~/app/api/discord/gallery/galleryImages';
// Atoms
import AnimatedHeart from '~/atoms/icons/AnimatedHeart';
import useWindowResize from '~/hooks/useWindowResize';
import cleanURL from '~/utils/cleanURL';
import getObjectRects from '~/utils/renderedImageSize';
// Util
import { toRoman } from '~/utils/romanNumeral';
import capitalize from '~/utils/upperCaseFirst';

interface IProps {
  src: IDiscordImageURL | null;
  alt?: string;
  year?: number;
  sector?: string;
  props?: any;

  favoriteToggle: () => void;
  favorite: boolean;

  ID: string;

  month?: number;
  day?: number;

  ratio: [number, number];
}
interface IImageWrapper {
  isLoaded: boolean;
}
interface IHeartPos {
  enabled: boolean;
}
interface IInfoBar {
  isOpen: boolean;
}
interface IStyledImage {
  infoBarHeight: number;
}

// Main
// FIX: Favorites refreshing entire page upon unfavorite (/gallery/favorites)
function FocusedGalleryImage({
  src,
  alt = '',
  year,
  sector,

  favoriteToggle,
  favorite,

  month,
  day,

  ID,
  ratio,
  ...props
}: IProps) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const [windowWidth] = useWindowResize();

  const handleDoubleTap = useDoubleTap(doubleTap, 200, {
    onSingleTap: () => setIsInfoBarOpen(false),
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInfoBarOpen, setIsInfoBarOpen] = useState(false);
  const [infoBarWidth, setInfoBarWidth] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  function doubleTap() {
    favoriteToggle();
    localStorage.setItem('spreekey-has_double_tapped_to_favorite', 'true');
  }

  useEffect(() => {
    if (!imageRef.current) return;

    setInfoBarWidth(getObjectRects(imageRef.current).positioned.width);
  }, [windowWidth]);

  if (!src) return null;

  return (
    <div onClick={e => e.stopPropagation()}>
      <div
        {...handleDoubleTap}
        className={clsx(
          'flex flex-col items-center justify-center opacity-0 blur-[15px] transition-[opacity,filter] duration-500 ease-out',
          isLoaded && 'opacity-1 blur-0'
        )}
      >
        <IoMdClose
          className='absolute bottom-[10%] left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#0000007f] text-4xl shadow-[0_0_8px_8px_#0000007f]'
          onClick={() =>
            router.push(pathname.substring(0, pathname.lastIndexOf('/')))
          }
        />

        <Image
          draggable={false}
          className='w-[90vw] select-none object-contain'
          style={{
            maxHeight: `calc(90vh - 5rem - ${
              infoBarRef.current?.offsetHeight || 0
            }px)`,
          }}
          ref={imageRef}
          src={src}
          alt={alt}
          {...props}
          onLoad={() => {
            setIsLoaded(true);
            if (imageRef.current)
              setInfoBarWidth(
                getObjectRects(imageRef.current).positioned.width
              );
          }}
        />

        <div
          className='absolute bottom-0 left-2/4 hidden h-6 w-20 -translate-x-2/4 rounded-[8px_8px_0_0] border-b-2 border-solid border-b-[color:var(--tertiary-background)] bg-secondary max-md:block'
          onClick={(e: any) => {
            e.stopPropagation();
            setIsInfoBarOpen(true);
          }}
        />
        <div
          className={clsx(
            'flex w-full items-center justify-between gap-4 bg-secondary px-4 py-2 max-md:absolute max-md:bottom-0 max-md:h-0 max-md:flex-col max-md:overflow-hidden max-md:py-0 max-md:transition-[height,padding] max-md:duration-500 max-md:ease-out max-md:focus-within:h-[15em] max-md:focus-within:px-0 max-md:focus-within:py-[1.5em]',
            isInfoBarOpen && 'max-md:h-[15em] max-md:px-0 max-md:py-[1.5em]'
          )}
          style={{
            width: imageRef.current ? infoBarWidth + 'px' : 'auto',
          }}
          ref={infoBarRef}
        >
          <div className='flex items-center justify-center gap-4'>
            <Link href='/commissions' className='text-inherit no-underline'>
              Interested?
            </Link>
          </div>

          <div className='flex flex-1 items-center justify-center gap-4'>
            <p>
              {year}
              {month !== undefined && '.' + toRoman(month)}
              {month !== undefined && '.' + day}
            </p>
            <div className='w-12' onClick={favoriteToggle}>
              <AnimatedHeart enabled={favorite} />
            </div>
            <p>{capitalize(sector)}</p>
          </div>

          <div className='flex items-center justify-center gap-1'>
            <a
              target='_blank'
              className='text-inherit no-underline'
              href={cleanURL(src)}
            >
              Higher Quality
            </a>
            <BiLinkExternal className='ml-1' />
          </div>
        </div>

        <div
          className={clsx(
            'pointer-events-none absolute inset-0 z-[1] flex h-full w-full items-center justify-center',
            favorite &&
              '[animation:500ms_cubic-bezier(0.99,-0.04,0.35,1.01)_forwards_ScaleOut_1.1s'
          )}
        >
          <div className='h-[clamp(6em,5vw,10em)] w-[clamp(6em,5vw,10em)]'>
            <AnimatedHeart autoHide={true} enabled={favorite} />
          </div>
        </div>
      </div>
    </div>
  );
}

// // Styles

// const ImageWrapper = styled.div<IImageWrapper>`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   transition: opacity 500ms ease-out, filter 500ms ease-out;

//   opacity: 0;
//   filter: blur(15px);

//   ${props =>
//     props.isLoaded &&
//     css`
//       opacity: 1;
//       filter: blur(0);
//     `}
// `;

// const NewLinkIcon = styled(BiLinkExternal)`
//   margin-left: 0.25em;
//   /* Resizing for some reason */
// `;

// const StyledImage = styled.img<IStyledImage>`
//   /* max-height: calc(100% - ${props => props.infoBarHeight}px); */
//   /* height: calc(100% - ${props => props.infoBarHeight}px); */
//   width: 90vw;
//   max-height: calc(
//     90vh - ${props => props.infoBarHeight}px ${isMobile && '- 5em'}
//   );
//   object-fit: contain;

//   user-select: none;
//   -webkit-user-drag: none;
// `;
// const CloseIcon = styled(IoMdClose)`
//   position: absolute;
//   bottom: 10%;
//   left: 50%;
//   transform: translateX(-50%);
//   font-size: 2.5em;

//   cursor: pointer;
//   border-radius: 50%;

//   box-shadow: 0 0 8px 8px #0000007f;
//   background-color: #0000007f;
// `;
// const MiddleHeartPositionWrapper = styled.div<IHeartPos>`
//   ${props =>
//     props.enabled &&
//     'animation: 500ms cubic-bezier(0.99, -0.04, 0.35, 1.01) forwards ScaleOut 1.1s;'}

//   @keyframes ScaleOut {
//     0% {
//       scale: 1;
//     }

//     100% {
//       scale: 0;
//     }
//   }

//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;

//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   z-index: 1;

//   pointer-events: none;
// `;
// const HeartWrapper = styled.div`
//   width: 3em;
//   height: 3em;
// `;
// const MiddleHeartWrapper = styled.div`
//   width: clamp(6em, 5vw, 10em);
//   height: clamp(6em, 5vw, 10em);
// `;

// // Info Bar
// const InfoBar = styled.div<IInfoBar>`
//   background-color: var(--secondary-background);
//   padding: 0.5em 1em;

//   width: 100%;

//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 1em;

//   @media only screen and (max-width: 50rem) {
//     height: 0;
//     position: absolute;
//     overflow: hidden;
//     bottom: 0;
//     padding-top: 0;
//     padding-bottom: 0;
//     flex-direction: column;

//     transition: height 500ms ease-out, padding 500ms ease-out;

//     &:focus-within {
//       height: 15em;
//       padding: 1.5em 0;
//     }

//     ${props =>
//       props.isOpen &&
//       `height: 15em;
//       padding: 1.5em 0;`}
//   }
// `;
// const InfoGroup = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1em;

//   @media only screen and (max-width: 50rem) {
//     flex-direction: column;
//   }
// `;
// const InfoTab = styled.div`
//   display: none;

//   position: absolute;
//   background-color: var(--secondary-background);
//   width: 5em;
//   height: 1.5em;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 0;

//   border-bottom: 2px solid var(--tertiary-background);

//   border-radius: 8px 8px 0 0;

//   @media only screen and (max-width: 48rem) {
//     display: block;
//   }
// `;
// const InfoInterested = styled(Link)`
//   color: inherit;
//   text-decoration: none;
// `;
// const InfoYearText = styled.p``;
// const InfoSectorText = styled.p``;
// const InfoOpenOriginal = styled.a.attrs({ target: '_blank' })`
//   color: inherit;
//   text-decoration: none;
// `;

export default FocusedGalleryImage;
