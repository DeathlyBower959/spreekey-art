import {
  APIChannel,
  APIGuildCategoryChannel,
  APIMessage,
  APITextChannel,
  ChannelType,
} from 'discord-api-types/v10';
import { NextResponse } from 'next/server';
import { cache } from 'react';
import {
  DiscordImageHostRegex,
  DiscordImagePathRegex,
  DiscordMediaHostRegex,
  IArt,
  IArtLocation,
  IArtLocationKeys,
  IDiscordImagePath,
  IDiscordImageURL,
  IGalleryImages,
  IURLMode,
} from '~/app/api/discord/gallery/galleryImages';
import { env } from '~/env.mjs';

const DISCORD_API_URL = 'https://discord.com/api/v10/';
const dapi = (url: string, data: RequestInit = {}) =>
  fetch(`${DISCORD_API_URL}${url}`, {
    ...data,
    headers: {
      ...data.headers,
      Authorization: `Bot ${env.DISCORD_TOKEN}`,
    },
    // next: { revalidate: 60 * 60 * 12 }, // Cache is inconsistent, keep an eye on it
  });

export const revalidate = 30;
export const dynamic = 'force-dynamic';

interface IArtYearChannels {
  main: APITextChannel | null;
  alt: APITextChannel | null;
  sketches: APITextChannel | null;
}
interface TotalCount {
  main: number;
  alt: number;
  sketches: number;
}

type Messages = IArt[];

export async function GET() {
  console.time('Test');
  const { out, totals } = await AggregateImages();
  console.timeEnd('Test');

  console.log(
    `Total Art: ${totals.main + totals.alt + totals.sketches}\n` +
      `Main: ${totals.main}\n` +
      `Alt: ${totals.alt}\n` +
      `Sketches: ${totals.sketches}`
  );

  return NextResponse.json(out);
  // return out;
}

const AggregateImages = async () => {
  const GUILD_ID = '982673799747080192';

  const channelsRes = await dapi(`guilds/${GUILD_ID}/channels`);
  if (!channelsRes.ok)
    throw new Error(`Failed to find channels in guild: ${GUILD_ID}`);
  const all_channels = (await channelsRes.json()) as APIChannel[];

  let text_channels: APITextChannel[] = [];
  const categories = all_channels
    .filter(channel => {
      if (
        channel.type === ChannelType.GuildCategory &&
        channel.name.match(/[0-9]{3}/)
      ) {
        return true;
      } else if (channel.type === ChannelType.GuildText) {
        text_channels.push(channel);
      }
      return false;
    })
    .sort(
      (a, b) => parseInt(b.name || '0') - parseInt(a.name || '0')
    ) as APIGuildCategoryChannel[];

  if (categories.length <= 0) throw new Error('Failed to find categories');

  let NESTED_CATEGORIES: Record<string, APITextChannel[]> = {};

  let LOOKUP_TABLE: Record<string, string> = {};
  categories.forEach(x => {
    LOOKUP_TABLE[x.id] = x.name;
    NESTED_CATEGORIES[x.name] = [];
  });

  text_channels.forEach(chan => {
    if (chan.type !== ChannelType.GuildText) return;

    NESTED_CATEGORIES[LOOKUP_TABLE[chan.parent_id || '']]?.push(chan);
  });

  let channelIDs: {
    [key: string]: IArtYearChannels;
  } = {};

  const ArtLocations = IArtLocationKeys;

  Object.keys(NESTED_CATEGORIES).forEach(year => {
    const children = NESTED_CATEGORIES[year as keyof typeof NESTED_CATEGORIES];

    console.info(`Processing Category: ${year}`);

    let channels: IArtYearChannels = {
      main: null,
      alt: null,
      sketches: null,
    };

    children.forEach(channel => {
      const index = channel.name.split(/[–, -]/)[1] as IArtLocation;

      if (!ArtLocations.includes(index)) {
        console.error(
          'Failed to load channel: ' + channel.id + ' | ' + channel.name
        );
        return;
      }

      console.info(
        `Channel found: ${
          channel.name[0].toUpperCase() +
          channel.name.substring(1, channel.name.length)
        }`
      );
      channels[index] = channel;
    });

    if (Object.values(channels).every(x => x === null)) {
      console.error(`Invalid category: ${year}`);
      return;
    }

    console.log('\n');
    channelIDs[year] = channels;
  });

  const data = await GetMessages(channelIDs);

  return data;
};

async function FetchAllMessages(
  channel?: APITextChannel
): Promise<APIMessage[]> {
  if (!channel) {
    console.error('No channel provided');
    return [];
  }

  let messages: APIMessage[] = [];
  let lastID: string | undefined;

  while (true) {
    const params = new URLSearchParams({
      limit: '100',
    });
    if (lastID) params.append('before', lastID);

    const messagesRes = await dapi(
      `channels/${channel.id}/messages?${params.toString()}`
    );

    if (!messagesRes.ok) {
      console.error('Failed to fetch messages');
      return [];
    }
    const fetchedMessages = (await messagesRes.json()) as APIMessage[];

    if (fetchedMessages.length === 0) break;

    messages = [...messages, ...fetchedMessages];
    lastID = fetchedMessages[fetchedMessages.length - 1].id;
  }

  console.info(`Messages (${channel.name}): ${messages.length}`);
  return messages;
}

function PopulateMessages(year: number, channel: APITextChannel | null) {
  return new Promise<Messages>(async (res, rej) => {
    if (!channel) return rej('Channel not found: ');

    try {
      let outMessages: Messages = [];

      const messages = await FetchAllMessages(channel);

      if (messages.length === 0) return rej(`Messages not found: `);
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];

        const attachments = msg.attachments;
        if (attachments?.length === 0) {
          console.warn(`No attachments: ${msg.id}`);
          continue;
        }

        for (let j = 0; j < attachments.length; j++) {
          const attachment = attachments[j];

          const url = (
            attachment.content_type === 'image/gif'
              ? attachment.url
              : attachment.proxy_url
          ) as IDiscordImageURL;

          if (!url) {
            console.error(`No image URL: ${msg.id}`);
            continue;
          }

          const { width, height } = attachment;

          const dims: [number, number] = [width ?? 720, height ?? 720];

          const host = url.match(DiscordImageHostRegex)?.[0];
          const path = url.match(DiscordImagePathRegex)?.[0];

          const mode = host?.match(DiscordMediaHostRegex)?.[0];

          if (!path) {
            console.error(`No image path: ${msg.id}`);
            return;
          }

          let data: Messages[0] = {
            mode: !!mode ? IURLMode.MEDIA : IURLMode.CDN,
            url: path as IDiscordImagePath,
            dims,
          };

          if (year >= 2023)
            data = {
              ...data,
              month: new Date(msg.timestamp).getMonth() + 1,
              day: new Date(msg.timestamp).getDate(),
            };

          outMessages.push(data);
        }
      }
      res(outMessages);
    } catch (err) {
      rej(err);
    }
  });
}

function handlePopulateError(type: IArtLocation, reason: string) {
  console.error(reason + type);
}
async function GetMessages(channelIDs: {
  [key: string]: IArtYearChannels;
}): Promise<{ out: IGalleryImages; totals: TotalCount }> {
  let out: IGalleryImages = {};
  let totals: TotalCount = {
    main: 0,
    alt: 0,
    sketches: 0,
  };

  for (let i = Object.keys(channelIDs).length - 1; i >= 0; i--) {
    const year = Object.keys(channelIDs)[i];

    const mainChannel = channelIDs[year].main;
    const altChannel = channelIDs[year].alt;
    const sketchesChannel = channelIDs[year].sketches;

    console.info(
      year + '\n',
      `main: ${mainChannel?.id || 'none'}\n`,
      `alt: ${altChannel?.id || 'none'}\n`,
      `sketches: ${sketchesChannel?.id || 'none'}`
    );

    const promises = [
      PopulateMessages(parseInt(year), mainChannel).catch(r =>
        handlePopulateError('main', r)
      ),
      PopulateMessages(parseInt(year), altChannel).catch(r =>
        handlePopulateError('alt', r)
      ),
      PopulateMessages(parseInt(year), sketchesChannel).catch(r =>
        handlePopulateError('sketches', r)
      ),
    ] as const;

    let [mainMessages = [], altMessages = [], sketchesMessages = []] =
      await Promise.all(promises);

    out[parseInt(year)] = {
      main: mainMessages,
      alt: altMessages,
      sketches: sketchesMessages,
    };

    totals.main += mainMessages.length;
    totals.alt += altMessages.length;
    totals.sketches += sketchesMessages.length;

    console.log('\n');
  }

  return { out, totals };
}
