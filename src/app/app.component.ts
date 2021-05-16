import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { SearchItem } from './utils/types';
import { Repository } from './model/repository';
import { User } from './model/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSearching = false;
  isFetched = false;
  error: string | null;
  searchResults: SearchItem[] = [];

  constructor(private githubService: GithubService) {}

  onSearch = async (value: string) => {
    if (value.length < 3) {
      this.searchResults = [];
      this.isFetched = false;
      this.error = null;
      return;
    }
    this.isSearching = true;
    this.isFetched = false;
    this.error = null;
    try {
      this.searchResults = await this.githubService.search(value).toPromise();
    } catch (e) {
      this.searchResults = [];
      this.error = e?.message ? e.message.trim() : 'Unexpected error';
    } finally {
      this.isSearching = false;
      this.isFetched = true;
    }
  };

  onSelectItem = (item: Repository | User) => {
    window.open(item.url, '_blank');
  };
}
