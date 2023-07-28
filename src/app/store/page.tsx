import KoFi from '~/components/atoms/icons/socials/Ko-Fi';

export default function Store() {
  return (
    <>
      <a
        className='flex items-center justify-center w-full gap-8 mt-20 text-center h-min visited:text-inherit active:text-inherit max-md:flex-col-reverse max-md:justify-center'
        target='_blank'
        href='https://ko-fi.com/spreekey'
      >
        <div className='w-32'>
          <KoFi />
        </div>
        <h2 className='text-6xl font-bold underline'>Support Me!</h2>
      </a>
      <hr className='w-2/3 mx-auto my-16 text-' />
      <h3 className='text-5xl text-center'>COMING SOON...</h3>
    </>
  );
}
