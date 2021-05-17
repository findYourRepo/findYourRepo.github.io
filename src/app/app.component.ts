import { Component, OnInit } from '@angular/core';
import { GithubService } from './services/github.service';
import { SearchItem } from './utils/types';
import { Repository } from './model/repository';
import { User } from './model/user';
import { of, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSearching = false;
  isFetched = false;
  isActiveLayout = false;
  error: string | null;
  searchResults: SearchItem[] = [];

  onSearch$ = new Subject<string>();

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.onSearch$
      .pipe(
        switchMap((value) => {
          return this.githubService
            .search(value)
            .pipe(catchError(this.catchSearchErroor));
        })
      )
      .subscribe(
        (results: SearchItem[]) => {
          this.searchResults = results || [];
          this.isSearching = false;
          this.isFetched = true;
        },
        () => {
          this.searchResults = [];
          this.isSearching = false;
          this.isFetched = true;
        }
      );
  }

  onSearch = (value: string) => {
    this.error = null;
    this.isFetched = false;

    if (value.length < 3) {
      this.searchResults = [];
      this.isActiveLayout = false;
      this.isSearching = false;
    } else {
      this.isActiveLayout = true;
      this.isSearching = true;

      this.onSearch$.next(value);
    }
  };

  onSelectItem = (item: Repository | User) => {
    window.open(item.url, '_blank');
  };

  private catchSearchErroor = (e) => {
    this.error =
      e.error?.message ?? (e.message ? e.message.trim() : 'Unexpected error');
    return of([]);
  };
}
