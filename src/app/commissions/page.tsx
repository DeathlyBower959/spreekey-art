import { FaVrCardboard } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { getTrelloData } from '~/app/api/trello';
import MemoAnimated from '~/components/atoms/icons/Animated';
import NumberFlipper from '~/components/atoms/icons/Flipper';
import { trelloConfig } from '~/config';

// 10 minutes
// export const revalidate = 600;
// export const dynamic = 'force-dynamic';

export default async function Commissions() {
  const trelloData = await getTrelloData();

  const cards = trelloData[trelloData.length - 1].lists?.[0].cards;
  if (!cards) throw new Error('Card lists not found');

  const index = cards.findIndex(card => card.name === '✦Terms of Service');

  if (!index || index < 0) throw new Error('TOS not found');

  // let TOSData = cards
  //   .slice(index + 1, cards.length)
  //   .map(({ shortUrl, labels, ...card }) => card);
  let TOSData = cards[index].desc.split(/-{3,}/g, 3).map((content, idx) => ({
    section: content.match(/### \*\*✦ (?<title>.*)\*\*/)?.groups?.['title'],
    content:
      idx >= -1
        ? content.split('\n\n', 3).splice(2).join('"\n\n')
        : content.split('\n\n', 3)[2],
  })); // FIX spacing difference on first vs 2nd page

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
                  const nameSplit = card.name.split(' ');
                  const name = nameSplit[1];
                  // if (!name) return null;

                  const type = nameSplit[0]
                    .match(/.+/)?.[0]
                    .replace('[', '')
                    .replace(']', '');
                  // if (!type) return null;

                  const acceptedDate = card.desc
                    .match(
                      /Date accepted: ([0-9]{1,2})(.|-)([0-9]{1,2})(.|-)([0-9]{1,2})/
                    )?.[0]
                    .split(': ')[1];
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
              {section.content
                .replaceAll('-', trelloConfig.TOS.PREFIXED_CHARACTER)
                // .replaceAll(/### (.*):/g, '[$1 ]')
                .split('\n')
                .map((item, itemIdx) => (
                  <div
                    className='mb-4'
                    key={`comm-item-${sectionIdx}-${itemIdx}`}
                  >
                    {item
                      .split(/(\*\*.*?\*\*)|(>>> .*?)|(### .*)|(`.*`)/)
                      .map((group, groupIdx) => {
                        if (!group) return null;

                        if (
                          group.match(/\*\*.*?\*\*/) &&
                          group.match(/### (.*):/)
                        )
                          return (
                            <div
                              key={`comm-item-strong-title-${itemIdx}-${groupIdx}`}
                            >
                              <br />
                              <strong>
                                {group
                                  .replace(/### (.*):/, '$1')
                                  .replace(
                                    /\*\*(.*?)\*\*/,
                                    `${trelloConfig.TOS.TITLE_ENCAPSULATION_CHARACTERS[0]} $1 ${trelloConfig.TOS.TITLE_ENCAPSULATION_CHARACTERS[1]}`
                                  )}
                              </strong>
                            </div>
                          );

                        if (group.match(/`.*`/)) {
                          return (
                            <code key={`comm-item-code-${itemIdx}-${groupIdx}`}>
                              {group.replace(/`(.*)`/, '$1')}
                            </code>
                          );
                        }

                        if (group.match(/### (.*):/)) {
                          return (
                            <div key={`comm-item-title-${itemIdx}-${groupIdx}`}>
                              <br />
                              {group.replace(/### (.*):/, '$1')}
                            </div>
                          );
                        }

                        if (group.match(/(\*\*.*?\*\*)/))
                          return (
                            <strong
                              key={`comm-item-strong-${itemIdx}-${groupIdx}`}
                            >
                              {group.replace(/\*\*(.*?)\*\*/, '$1')}
                            </strong>
                          );

                        if (group.match(/>>>(.*?)/))
                          return (
                            <hr
                              className='my-4 w-full border-[1px] border-solid border-[var(--tertiary-background)]'
                              key={`comm-item-horizontal-rule-${itemIdx}-${groupIdx}`}
                            />
                          );

                        return group + ' ';
                      })}
                  </div>
                ))}
            </section>
          );
        })}
      </div>
    </>
  );
}
