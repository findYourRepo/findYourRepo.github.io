import { SearchItemType } from '../../model/search-item';
import { UserResponse } from '../responses/user-response';
import { User } from '../../model/user';

export const fromUserResponseToUser = (response: UserResponse[]): User[] => {
  if (!response) {
    return [];
  }

  return response.map((user: UserResponse) => {
    return {
      name: user.login,
      url: user.url,
      avatar: user.avatar_url,
      type: SearchItemType.USER,
    };
  });
};
