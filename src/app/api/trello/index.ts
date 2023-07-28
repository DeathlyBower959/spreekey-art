import { getBoards, getCards, getLists } from './trello';
import { Board, List } from './validate';

export async function getTrelloData() {
  const boards = await getBoards(['name', 'shortUrl']);

  if (!boards) throw new Error('Failed to retrieve boards');

  let data: Board[] = [];

  for (let bIdx = 0; bIdx < boards.length; bIdx++) {
    const board = boards[bIdx];

    const lists = await getLists(board.id, ['name']);

    let listData: List[] = [];

    for (let lIdx = 0; lIdx < lists.length; lIdx++) {
      const list = lists[lIdx];

      const cards = await getCards(list.id, [
        'name',
        'labels',
        'shortUrl',
        'desc',
      ]);

      listData.push({
        ...list,
        cards: cards || [],
      });
    }

    data.push({
      ...board,
      lists: listData,
    });
  }

  return data;
}
