import { SearchItem } from '../model/search-item';

export const sortSearchItemsAlphabetically = (
  item1: SearchItem,
  item2: SearchItem
) => {
  if (item1.name < item2.name) {
    return -1;
  }
  if (item1.name > item2.name) {
    return 1;
  }
  return 0;
};
