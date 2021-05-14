import { UserResponse } from '../responses/user-response';
import { User } from '../../model/user';
import { ItemType } from '../../model/item';

export const fromUserResponseToUser = (response: UserResponse[]): User[] => {
  if (!response) {
    return [];
  }

  return response.map((user: UserResponse) => {
    return {
      id: `user-${user.id}`,
      name: user.login,
      url: `https://github.com/${user.login}`,
      avatar: user.avatar_url,
      type: ItemType.USER,
    };
  });
};
