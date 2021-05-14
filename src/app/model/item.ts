export enum ItemType {
  REPO = 'repo',
  USER = 'user',
}

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  url: string;
}
