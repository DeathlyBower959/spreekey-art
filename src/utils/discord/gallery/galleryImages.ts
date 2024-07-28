export interface IGalleryImages {
  [key: number]: IArtYear;
}

export interface IArtYear {
  main?: IArt[];
  alt?: IArt[];
  sketches?: IArt[];
}

export const IArtLocationKeys = [
  'main',
  'alt',
  'sketches',
] satisfies (keyof IArtYear)[];
export type IArtLocation = (typeof IArtLocationKeys)[number];

export enum IURLMode {
  MEDIA,
  CDN,
}
export interface IArt {
  mode: IURLMode;
  url: IDiscordImagePath;
  dims: [number, number];
  month?: number;
  day?: number;

  sector?: string;
}

export interface IArtWithSector extends IArt {
  sector: IArtLocation;
}
export type ISectorKey = keyof IGalleryImages['2023'];

export type IDiscordImageID<Delimiter extends string = '/'> =
  `${number}${Delimiter}${number}`;
export type IDiscordImagePath = `${IDiscordImageID}/${string}`;
export type IDiscordImageURL =
  | `https://media.discordapp.net/attachments/${IDiscordImagePath}`
  | `https://cdn.discordapp.com/attachments/${IDiscordImagePath}`;

export const DiscordImagePathIDRegex = new RegExp('([0-9]+)/([0-9]+)');
export const DiscordImagePathRegex = new RegExp(
  DiscordImagePathIDRegex.source + '/[A-z,0-9,-]+.[A-z]+'
);
export const DiscordImagePathDataRegex = new RegExp(
  DiscordImagePathRegex.source + '.*'
);

export const DiscordImageHostRegex = new RegExp(
  'https://(media|cdn).discordapp.(net|com)/attachments/'
);
export const DiscordMediaHostRegex = new RegExp(
  'https://media.discordapp.net/attachments/'
);
