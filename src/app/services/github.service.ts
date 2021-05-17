import { Injectable } from '@angular/core';
import { Observable, queueScheduler, scheduled } from 'rxjs';
import { combineLatest } from 'rxjs';
import { Repository } from '../model/repository';
import { UsersService } from './users.service';
import { User } from '../model/user';
import { RepositoriesService } from './repositories.service';
import { catchError, map } from 'rxjs/operators';
import { sortSearchItemsAlphabetically } from '../utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(
    private userService: UsersService,
    private repositoryService: RepositoriesService
  ) {}

  search = (searchPhrase: string): Observable<(User | Repository)[]> =>
    combineLatest(
      this.repositoryService.searchRepositories(searchPhrase),
      this.userService.searchUsers(searchPhrase),
      (repos, users) => {
        return [...repos, ...users];
      }
    ).pipe(
      map((searchItems) =>
        searchItems.sort(sortSearchItemsAlphabetically).splice(0, 50)
      )
    );
}
