import { RepositoryResponse } from '../responses/repository-response';
import { Repository } from '../../model/repository';
import { SearchItemType } from '../../model/search-item';

export const fromRepositoryResponseToRepository = (
  response: RepositoryResponse[]
): Repository[] => {
  if (!response) {
    return [];
  }

  return response.map((repository) => {
    return {
      name: repository.name,
      url: repository.url,
      language: repository.language,
      type: SearchItemType.REPO,
    };
  });
};
