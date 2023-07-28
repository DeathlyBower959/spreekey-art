import clsx from 'clsx';
import Image from 'next/image';
import AboutImage from '~/assets/background/about-hero.jpg';
import LazyImage from '~/components/atoms/LazyImage';

const contentSizeStyles = clsx('w-[45vw] h-[800px] max-w-[600px]');

export default function About() {
  return (
    <>
      

      <div className='grid mx-auto my-16 w-min justify-items-center'>
        <LazyImage
          className={clsx(
            'z-[-1] col-[1] row-[1] mr-[200px] object-cover shadow-xl max-lg:mr-0 max-lg:w-[90vw] max-lg:max-w-none',
            contentSizeStyles
          )}
          src={AboutImage}
          alt='About background image'
        />
        <div
          className={clsx(
            'col-[1] row-[1] ml-[200px] mt-16 border-[20px] border-solid border-[var(--tertiary-bg)] bg-secondary p-9 text-xl leading-[200%] shadow-2xl max-lg:ml-0 max-lg:h-auto max-lg:w-[80vw] max-xs:text-center',
            contentSizeStyles
          )}
        >
          <h1 className='mb-8 text-4xl font-bold max-xs:text-3xl'>spreekey</h1>
          <p className='mb-4 leading-9 max-sm:leading-7 max-xs:text-sm'>
            An artist who enjoys character design, illustration, and
            story-making. Has been drawing for over 6 years, primarily
            digitally: working to improve their skill and experience in the
            industry. 5th Generation IPad Mini and an offbrand apple pencil as
            the tools of the trade. Hoping to work on animations and web-comics
            in the future, with{' '}
            <a target='_blank' href='https://toyhou.se/spreekey/characters'>
              personal characters
            </a>{' '}
            and stories.
          </p>
          <div className='!mb-0 leading-[115%] max-xs:text-lg'>
            <p>
              twitter:{' '}
              <a
                className='text-[var(--link-accent)]'
                target='_blank'
                href='https://twitter.com/spreekey'
              >
                @spreekey
              </a>
            </p>
            <p>
              toyhouse:{' '}
              <a
                className='text-[var(--link-accent)]'
                target='_blank'
                href='https://toyhou.se/spreekey'
              >
                spreekey
              </a>
            </p>
            <p>
              instagram:{' '}
              <a
                className='text-[var(--link-accent)]'
                target='_blank'
                href='https://instagram.com/spreekey'
              >
                @spreekey
              </a>
            </p>
            <p>
              ko-fi:{' '}
              <a
                className='text-[var(--link-accent)]'
                target='_blank'
                href='https://ko-fi.com/spreekey'
              >
                spreekey
              </a>
            </p>
          </div>
        </div>
      </div>
      <a
        className='mx-auto my-4 h-min w-max max-w-[90vw] rounded-lg bg-secondary px-8 py-4 text-center text-primary no-underline opacity-50'
        target='_blank'
        href='https://github.com/DeathlyBower959'
      >
        Built by: DeathlyBower959
      </a>
    </>
  );
}
