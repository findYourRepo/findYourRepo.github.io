import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SEARCH_API_BASE } from '../utils/constants';
import { SearchResponse } from './responses/search-response';
import { map } from 'rxjs/operators';

type Params =
  | HttpParams
  | {
      [param: string]: string | string[];
    };

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(private http: HttpClient) {}

  get = <T>(url: string, params: Params) => {
    return this.http
      .get<SearchResponse<T>>(SEARCH_API_BASE + url, { params })
      .pipe(map((response) => response.items));
  };
}
