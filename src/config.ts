export const trelloConfig = {
  API: 'https://api.trello.com/1',
  WORKSPACE_ID: 'spreekey_',
  LABEL_KEYS: {
    PAID: ['paid'],
    UNPAID: ['unpaid'],
    NOT_STARTED: ['not started'],
    IN_PROGRESS: ['in progress'],
    COMPLETE: ['complete'],
    VR: ['vr'],
    OWED_ART: ['owed art'],
    CONCEPT: ['concept'],
    ANIMATED: ['animated'],
  },
  TOS: {
    PREFIXED_CHARACTER: '>',
    TITLE_ENCAPSULATION_CHARACTERS: ['[', ']'],
  },
};
export const YEAR_RANGE = [2017, new Date().getFullYear()] as const;
// 1 = None
// 2 = Half screen width
// 3 = 1/3 screen width, etc.
export const IMAGE_COMPRESSION = {
  default: 2,
  preview: 20,
};

export const FLIPPER = {
  MAX_ROTATIONS: 15,
  DELAY_INTERVAL: 75,
  OFFSET_TIME: 250,
};
