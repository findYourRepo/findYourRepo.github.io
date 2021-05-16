import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { HeadComponent } from './components/head/head.component';
import { BodyComponent } from './components/body/body.component';
import { SearchComponent } from './components/search/search.component';
import { SearchFieldComponent } from './components/search/search-field/search-field.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeadComponent,
        BodyComponent,
        SearchComponent,
        SearchFieldComponent,
        SearchResultsComponent,
      ],
      providers: [
        {
          provide: GithubService,
          useValue: jasmine.createSpyObj('GithubService', ['search']),
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
