import KoFi from '~/components/atoms/icons/socials/Ko-Fi';

export default function Store() {
  return (
    <>
      <a
        className='mt-20 flex h-min w-full items-center justify-center gap-8 text-center visited:text-inherit active:text-inherit max-md:flex-col-reverse max-md:justify-center'
        target='_blank'
        href='https://ko-fi.com/spreekey'
      >
        <div className='w-32'>
          <KoFi />
        </div>
        <h2 className='text-6xl font-bold underline'>Support Me!</h2>
      </a>
      <hr className='text- mx-auto my-16 w-2/3' />
      <h3 className='text-center text-5xl'>COMING SOON...</h3>
    </>
  );
}
