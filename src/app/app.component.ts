import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { SearchItem } from './utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSearching = false;
  searchResults: SearchItem[] = [];
  constructor(private githubService: GithubService) {}

  onSearch = async (value: string) => {
    if (value.length < 3) {
      this.searchResults = [];
      return;
    }
    this.isSearching = true;
    try {
      this.searchResults = await this.githubService.search(value).toPromise();
    } catch (e) {
      // TODO: catch
    } finally {
      this.isSearching = false;
    }
  };
}
