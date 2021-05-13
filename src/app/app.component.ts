import { Component } from '@angular/core';
import { GithubService } from './services/github.service';
import { Observable } from 'rxjs';
import { Repository } from './model/repository';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSearching = false;
  constructor(private githubService: GithubService) {}

  searchResults$: Observable<(Repository | User)[]>;

  search = (value: string) => {
    this.searchResults$ = this.githubService.search(value);
  };
}
