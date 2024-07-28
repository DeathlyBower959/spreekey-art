'use client';
import clsx from 'clsx';
import Link from 'next/link';
import CommissionsImage from '~/assets/background/commissions-section.png';
import GalleryImage from '~/assets/background/gallery-section.png';
import HeroImage from '~/assets/background/hero-section.png';
import StoreImage from '~/assets/background/store-section.png';
import Logo from '~/components/atoms/icons/Logo';
import Instagram from '~/components/atoms/icons/socials/Instagram';
import KoFi from '~/components/atoms/icons/socials/Ko-Fi';
import ToyHouse from '~/components/atoms/icons/socials/ToyHouse';
import Twitter from '~/components/atoms/icons/socials/Twitter';
import Watermark from '~/components/atoms/icons/Watermark';
import LazyImage from '~/components/atoms/LazyImage';

import styles from './page.module.scss';

const sectionStyles = (styles?: string) =>
  clsx('w-screen h-auto relative overflow-y-hidden mb-[7rem]', styles);
const mainSectionStyles = clsx(
  sectionStyles(),
  '!h-[50em] flex flex-col justify-center items-center gap-8'
);

const logoContainerStyles = clsx(
  'h-[min(50vw,50vh)] w-full flex justify-center items-center'
);
const backgroundImageStyles = clsx(
  'absolute inset-0 left-1/2 z-[-2] h-full w-full -translate-x-1/2 object-cover blur-sm brightness-[0.35]'
);

const buttonStyles = clsx(
  'relative cursor-pointer border-[3px] border-solid border-primary bg-transparent px-[2em] py-[0.75em] text-xl font-bold uppercase text-primary no-underline transition-all duration-500 ease-linear',
  styles.button
);
const supportLowerStyles = clsx(
  'flex justify-center items-center flex-wrap gap-12'
);
const supportLowerInnerStyles = clsx(supportLowerStyles, '!gap-0 no-underline');

export default function Home() {
  return (
    <main>
      <section id='hero-section' className={sectionStyles('h-screen')}>
        <div className='flex h-full w-full flex-col items-center justify-center p-[10%]'>
          <div className={logoContainerStyles}>
            <Logo color='#eee' />
          </div>
          <div className={clsx(logoContainerStyles, 'h-auto')}>
            <Watermark color='var(--accent)' />
          </div>
        </div>
        <LazyImage
          className={backgroundImageStyles}
          src={HeroImage}
          alt='Hero image'
        />
      </section>
      <section
        id='about-me-section'
        className={sectionStyles(
          'mx-auto my-0 flex w-4/5 max-w-3xl flex-col text-center text-2xl'
        )}
      >
        avid character designer and illustrator, adamant on expanding their
        knowledge
        <Link
          href='/about'
          className='mt-[0.5em] text-lg text-secondary no-underline'
        >
          Read more
        </Link>
      </section>
      <section id='gallery-section' className={mainSectionStyles}>
        <h1 className='text-5xl font-bold'>Art Hall</h1>
        <p className='mx-4 text-xl font-bold text-center'>
          A walkthrough display of all of my artwork
        </p>
        <Link href='/gallery' className={buttonStyles}>
          Gallery
        </Link>
        <LazyImage
          className={backgroundImageStyles}
          src={GalleryImage}
          alt='Gallery hero image'
        />
      </section>
      <section id='commissions-section' className={mainSectionStyles}>
        <h1 className='text-5xl font-bold'>Commissions</h1>
        <p className='mx-4 text-xl font-bold text-center'>
          Request a customized art piece from me
        </p>
        <Link href='/commissions' className={buttonStyles}>
          Commissions
        </Link>
        <LazyImage
          className={backgroundImageStyles}
          src={CommissionsImage}
          alt='Commissions hero image'
        />
      </section>
      <section id='store-section' className={mainSectionStyles}>
        <h1 className='text-5xl font-bold'>Store</h1>
        <p className='mx-4 text-xl font-bold text-center'>
          Purchase some merchandise from my store
        </p>
        <Link href='/store' className={buttonStyles}>
          Store
        </Link>
        <LazyImage
          className={backgroundImageStyles}
          src={StoreImage}
          alt='Store hero image'
        />
      </section>
      <section
        id='support-section'
        className={clsx(mainSectionStyles, '!h-auto')}
      >
        <a
          target='_blank'
          href='https://ko-fi.com/spreekey'
          className='flex items-center justify-center no-underline'
        >
          <div className='w-[6em] pr-4'>
            <KoFi />
          </div>
          <p className='text-[2em] text-primary no-underline max-md:text-[1.5em]'>
            Support Me!
          </p>
        </a>
        <hr className='mx-auto my-8 w-2/3 border-[1px] border-solid border-bg-secondary' />
        <div className={supportLowerStyles}>
          <a
            className={supportLowerInnerStyles}
            target='_blank'
            href='https://www.instagram.com/spreekey/'
          >
            <div className='w-[6em] pr-4'>
              <Instagram />
            </div>
            <p className='text-[2em] text-primary no-underline max-md:text-[1.5em]'>
              @spreekey
            </p>
          </a>
          <a
            className={supportLowerInnerStyles}
            target='_blank'
            href='https://www.twitter.com/spreekey/'
          >
            <div className='w-[6em] pr-4'>
              <Twitter />
            </div>
            <p className='text-[2em] text-primary no-underline max-md:text-[1.5em]'>
              @spreekey
            </p>
          </a>
          <a
            className={supportLowerInnerStyles}
            target='_blank'
            href='https://www.toyhou.se/spreekey/'
          >
            <div className='w-[6em] pr-4'>
              <ToyHouse />
            </div>
            <p className='text-[2em] text-primary no-underline max-md:text-[1.5em]'>
              @spreekey
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
