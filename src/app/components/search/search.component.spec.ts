import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { ItemType } from '../../model/item';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchFieldComponent,
        SearchResultsComponent,
      ],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event after calling onSearch method', () => {
    const testPhrase = 'Test phrase';
    spyOn(component.search, 'emit');
    component.onSearchChange(testPhrase);

    fixture.detectChanges();
    expect(component.search.emit).toHaveBeenCalledWith(testPhrase);
  });

  it('should emit selectItem event after calling osSelect method', () => {
    const testItem = {
      id: 'user-10097549',
      name: 'jaroslawkrol',
      url: 'https://github.com/jaroslawkrol',
      avatar: 'https://avatars.githubusercontent.com/u/10097549?v=4',
      type: ItemType.USER,
    };
    spyOn(component.selectItem, 'emit');
    component.onSelect(testItem);

    fixture.detectChanges();
    expect(component.selectItem.emit).toHaveBeenCalledWith(testItem);
  });
});
