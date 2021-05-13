import { Injectable } from '@angular/core';
import { SearchApiService } from '../api/search-api.service';
import { Observable } from 'rxjs';
import { Endpoint, MAX_RESULTS_LENGTH } from '../utils/constants';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { UserResponse } from '../api/responses/user-response';
import { fromUserResponseToUser } from '../api/factories/from-user-response-to-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private searchApi: SearchApiService) {}

  searchUsers = (searchPhrase: string): Observable<User[]> => {
    const perPage = `${MAX_RESULTS_LENGTH}`;
    const page = '1';
    return this.searchApi
      .get<UserResponse>(Endpoint.USERS, {
        q: encodeURIComponent(searchPhrase),
        page,
        per_page: perPage,
      })
      .pipe(map(fromUserResponseToUser));
  };
}
