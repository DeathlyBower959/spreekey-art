import { z } from 'zod';
import { trelloConfig } from '~/config';

import {
  Board,
  boardSchema,
  Card,
  cardSchema,
  Fields,
  List,
  listSchema,
} from './validate';
import { get } from './wrapper';

export async function getBoards(fields: Fields = []) {
  return get<Board[]>(
    `/organizations/${trelloConfig.WORKSPACE_ID}/boards`,
    fields,
    z.array(boardSchema)
  );
}

export async function getLists(boardId: string, fields: Fields = []) {
  return get<List[]>(`/boards/${boardId}/lists`, fields, z.array(listSchema));
}

export async function getCards(listID: string, fields: Fields = []) {
  return get<Card[]>(`/lists/${listID}/cards`, fields, z.array(cardSchema));
}
