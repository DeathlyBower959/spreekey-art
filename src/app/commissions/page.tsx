import './style.css';

import { FaVrCardboard } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { getTrelloData } from '~/app/api/trello';
import MemoAnimated from '~/components/atoms/icons/Animated';
import NumberFlipper from '~/components/atoms/icons/Flipper';
import { trelloConfig } from '~/config';

import { Marked } from '@ts-stack/markdown';

// 10 minutes
// export const revalidate = 600;
// export const dynamic = 'force-dynamic';

export default async function Commissions() {
  const trelloData = await getTrelloData();

  const cards = trelloData[trelloData.length - 1].lists?.[0].cards;
  if (!cards) throw new Error('Card lists not found');

  const index = cards.findIndex(card => card.name === '✦Terms of Service');

  if (!index || index < 0) throw new Error('TOS not found');

  let TOSData = cards[index].desc
    .split(/-{3,}/g)
    .map(
      content =>
        content.trim() && {
          section: content.match(/### \*\*✦ (?<title>.*)\*\*/)?.groups?.[
            'title'
          ],
          content: content.replace(/[S\s]*### \*\*✦ [\S\s]*?\*\*/, '').trim(),
        }
    )
    .filter(Boolean);

  return (
    <>
      <h2 className='m-2 my-[1em] text-center text-6xl font-bold'>
        Commissions
      </h2>

      <div className='mx-auto mb-20 mt-0 min-h-[100px] w-[90vw] max-w-7xl overflow-x-auto bg-secondary'>
        <table
          className={'w-full border-separate border-spacing-2 rounded-sm p-8'}
        >
          <thead>
            <tr className='bg-tertiary'>
              <th className='text-2xl text-left bg-secondary'></th>
              <th className='text-2xl text-left bg-secondary'>NAME</th>
              <th className='text-2xl text-left bg-secondary'>TYPE</th>
              <th className='text-2xl text-left bg-secondary'>ACCEPTED</th>
              <th className='text-2xl text-left bg-secondary'>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {trelloData.map(board => {
              return board.lists?.map(list => {
                if (
                  list.name === '[0] Important, TOS' ||
                  list.name === '[V] Complete'
                )
                  return null;

                if ((list.cards?.length || 0) <= 0) return null;
                return list.cards?.map(card => {
                  const type = card.name
                    .match(/\[.+\]/g)?.[0]
                    .replace(/[\[\]]/g, '');
                  // if (!name) return null;

                  const name = card.name.match(/] .+$/g)?.[0].replace('] ', '');
                  // if (!type) return null;

                  let date = new Date(
                    card.desc
                      .match(
                        /Date accepted: ([0-9]{1,2})(.|-)([0-9]{1,2})(.|-)([0-9]{1,2})/
                      )?.[0]
                      .split(': ')[1] ||
                      1000 * parseInt(card.id.substring(0, 8), 16)
                  );
                  const acceptedDate = !isNaN(date.getTime())
                    ? `${date.getDate()}.${date.getMonth() + 1}.${
                        date.getFullYear() % 100
                      }`
                    : null;
                  // if (!acceptedDate) return null;

                  if (!card.labels) return null;

                  let status;

                  function isLabel(
                    labelFlag: keyof typeof trelloConfig.LABEL_KEYS
                  ) {
                    return !!card.labels?.find(label =>
                      trelloConfig.LABEL_KEYS[labelFlag].includes(
                        label.name.toLowerCase()
                      )
                    );
                  }

                  if (isLabel('COMPLETE')) return null;

                  if (isLabel('UNPAID')) {
                    status = 'Unpaid';
                  } else if (isLabel('NOT_STARTED')) {
                    status = 'Not started';
                  } else if (isLabel('CONCEPT')) {
                    status = 'Concept';
                  } else if (isLabel('IN_PROGRESS')) {
                    status = 'In progress';
                  }
                  if (!status) return null;

                  // TODO: Individual flipper?

                  return (
                    <tr className='bg-tertiary' key={card.id}>
                      <td className='text-2xl bg-secondary'>
                        <div
                          dir='rtl'
                          className='grid columns-2 items-center gap-[0.35em]'
                        >
                          {isLabel('VR') && <FaVrCardboard title='VR' />}
                          {isLabel('OWED_ART') && (
                            <MdChecklistRtl title='owed art' />
                          )}
                          {isLabel('ANIMATED') && (
                            <MemoAnimated title='animated' />
                          )}
                        </div>
                      </td>
                      <td className='relative rounded-sm px-6 py-0.5 text-2xl after:absolute after:left-0 after:top-2/4 after:block after:h-[0.1px] after:w-full after:-translate-y-2/4 after:bg-secondary'>
                        <NumberFlipper
                          current={name || '[REDACTED]'}
                          delay={400}
                        />
                      </td>

                      <td className='relative rounded-sm px-6 py-0.5 text-2xl after:absolute after:left-0 after:top-2/4 after:block after:h-[0.1px] after:w-full after:-translate-y-2/4 after:bg-secondary'>
                        <NumberFlipper current={type || 'N/A'} delay={550} />
                      </td>
                      <td className='relative rounded-sm px-6 py-0.5 text-2xl after:absolute after:left-0 after:top-2/4 after:block after:h-[0.1px] after:w-full after:-translate-y-2/4 after:bg-secondary'>
                        <NumberFlipper
                          current={acceptedDate || 'N/A'}
                          delay={700}
                        />
                      </td>
                      <td className='relative rounded-sm px-6 py-0.5 text-2xl after:absolute after:left-0 after:top-2/4 after:block after:h-[0.1px] after:w-full after:-translate-y-2/4 after:bg-secondary'>
                        <NumberFlipper
                          current={status || 'UNTRACKED'}
                          delay={850}
                        />
                      </td>
                    </tr>
                  );
                });
              });
            })}
          </tbody>
        </table>
      </div>

      <h3 className='m-2 mt-0 mb-8 text-5xl font-bold text-center'>
        Terms of Service
      </h3>
      <div className='mx-auto mb-8 grid max-w-[130rem] grid-cols-2 gap-8 px-12 max-xl:grid-cols-1'>
        {TOSData.map((section, sectionIdx) => {
          return (
            <section
              className='flex-1 px-8 py-4 rounded-m bg-secondary'
              key={section.section}
            >
              <h3 className='mb-3 text-2xl font-bold text-center'>
                {section.section}
              </h3>

              <div
                className='commissions_content'
                dangerouslySetInnerHTML={{
                  __html: Marked.parse(section.content, { sanitize: true }),
                }}
              />
            </section>
          );
        })}
      </div>
    </>
  );
}
