export enum SearchItemType {
  REPO = 'repo',
  USER = 'user',
}

export interface SearchItem {
  type: SearchItemType;
  name: string;
  url: string;
}
