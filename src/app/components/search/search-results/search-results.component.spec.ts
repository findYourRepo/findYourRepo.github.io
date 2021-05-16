import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { ElementRef } from '@angular/core';
import { ItemType } from '../../../model/item';
import { FocusedDirective } from '../../../directives/focused.directive';

class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
}

const MOCKED_ITEMS = [
  {
    id: 'user-10097549',
    name: 'jaroslawkrol',
    url: 'https://github.com/jaroslawkrol',
    avatar: 'https://avatars.githubusercontent.com/u/10097549?v=4',
    type: ItemType.USER,
  },
  {
    id: 'user-XXXXXXXX',
    name: 'anonymous',
    url: 'https://github.com/',
    avatar: 'https://avatars.githubusercontent.com/u/10097549?v=4',
    type: ItemType.USER,
  },
];

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let renderedItems: HTMLDivElement[];
  let selectedItem: HTMLDivElement;
  let hoveredItem: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, FocusedDirective],
      providers: [{ provide: ElementRef, useClass: MockElementRef }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    renderedItems = fixture.nativeElement.querySelectorAll('.search-item');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all records passed in searchResults input', () => {
    expect(renderedItems.length).toEqual(0);

    component.searchResults = MOCKED_ITEMS;
    fixture.detectChanges();

    renderedItems = fixture.nativeElement.querySelectorAll('.search-item');
    expect(renderedItems.length).toEqual(2);
  });

  it('should call onSelect method after click in existing item', fakeAsync(() => {
    spyOn(component, 'onSelect');

    component.searchResults = MOCKED_ITEMS;
    fixture.detectChanges();

    selectedItem = fixture.nativeElement.querySelector(
      `#search-item-${MOCKED_ITEMS[0].id}`
    );
    selectedItem.click();

    tick();

    expect(component.onSelect).toHaveBeenCalledWith(MOCKED_ITEMS[0]);
  }));

  it('should emit selectItem event after calling onSelect method', fakeAsync(() => {
    spyOn(component.selectItem, 'emit');

    component.onSelect(MOCKED_ITEMS[0]);
    tick();

    expect(component.selectItem.emit).toHaveBeenCalledWith(MOCKED_ITEMS[0]);
  }));

  it('should call onHighlight method after hover on existing item', fakeAsync(() => {
    spyOn(component, 'onHighlight');

    component.searchResults = MOCKED_ITEMS;
    fixture.detectChanges();

    hoveredItem = fixture.nativeElement.querySelector(
      `#search-item-${MOCKED_ITEMS[0].id}`
    );

    hoveredItem.dispatchEvent(
      new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true,
      })
    );

    tick();

    expect(component.onHighlight).toHaveBeenCalledWith(MOCKED_ITEMS[0]);
  }));

  it('should has is-selected class after calling onHighlight method', () => {
    component.searchResults = MOCKED_ITEMS;
    fixture.detectChanges();

    hoveredItem = fixture.nativeElement.querySelector(
      `#search-item-${MOCKED_ITEMS[0].id}`
    );
    expect(hoveredItem.className.indexOf('is-selected') > 0).toBeFalsy();

    component.onHighlight(MOCKED_ITEMS[0]);
    fixture.detectChanges();

    expect(hoveredItem.className.indexOf('is-selected') > 0).toBeTruthy();
  });

  it('should highlight next item after using use the down arrow', () => {
    component.searchResults = MOCKED_ITEMS;
    component.highlightedItemId = MOCKED_ITEMS[0].id;
    fixture.detectChanges();

    const clickArrowDown = () => {
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
      });
      window.dispatchEvent(event);
    };

    clickArrowDown();
    expect(component.highlightedItemId).toEqual(MOCKED_ITEMS[1].id);

    // should highlight first elem if last one is currently highlighted
    clickArrowDown();
    expect(component.highlightedItemId).toEqual(MOCKED_ITEMS[0].id);
  });

  it('should highlight previous item after using use the down arrow', () => {
    component.searchResults = MOCKED_ITEMS;
    component.highlightedItemId = MOCKED_ITEMS[1].id;
    fixture.detectChanges();

    const clickArrowUp = () => {
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
      });
      window.dispatchEvent(event);
    };

    clickArrowUp();
    expect(component.highlightedItemId).toEqual(MOCKED_ITEMS[0].id);

    // should highlight last elem if first one is currently highlighted
    clickArrowUp();
    expect(component.highlightedItemId).toEqual(MOCKED_ITEMS[1].id);
  });
});
