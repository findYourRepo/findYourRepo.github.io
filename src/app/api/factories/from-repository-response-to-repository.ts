import { RepositoryResponse } from '../responses/repository-response';
import { Repository } from '../../model/repository';
import { ItemType } from '../../model/item';

export const fromRepositoryResponseToRepository = (
  response: RepositoryResponse[]
): Repository[] => {
  if (!response) {
    return [];
  }

  return response.map((repository) => {
    return {
      id: `repo-${repository.id}`,
      name: repository.name,
      url: repository.svn_url,
      language: repository.language,
      type: ItemType.REPO,
    };
  });
};
