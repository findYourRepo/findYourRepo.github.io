import { Injectable } from '@angular/core';
import { SearchApiService } from '../api/search-api.service';
import { Observable } from 'rxjs';
import { Repository } from '../model/repository';
import { Endpoint, MAX_RESULTS_LENGTH } from '../utils/constants';
import { RepositoryResponse } from '../api/responses/repository-response';
import { map } from 'rxjs/operators';
import { fromRepositoryResponseToRepository } from '../api/factories/from-repository-response-to-repository';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  constructor(private searchApi: SearchApiService) {}

  searchRepositories = (searchPhrase: string): Observable<Repository[]> => {
    const perPage = `${MAX_RESULTS_LENGTH}`;
    const page = '1';
    return this.searchApi
      .get<RepositoryResponse>(Endpoint.REPOS, {
        q: encodeURIComponent(searchPhrase),
        page,
        per_page: perPage,
      })
      .pipe(map(fromRepositoryResponseToRepository));
  };
}
