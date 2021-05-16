import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { SearchItem } from './utils/types';
import { Repository } from './model/repository';
import { User } from './model/user';

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
      console.log(JSON.stringify(this.searchResults));
    } catch (e) {
      // TODO: catch
    } finally {
      this.isSearching = false;
    }
  };

  onSelectItem = (item: Repository | User) => {
    window.open(item.url, '_blank');
  };
}
