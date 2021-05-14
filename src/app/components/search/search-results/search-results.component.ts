import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SearchItem } from '../../../utils/types';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  @Input()
  searchResults: SearchItem[];

  @Output()
  selectItem = new EventEmitter<SearchItem>();

  highlightedItemId: string | null;
  height: number;

  @HostListener('window:keydown', ['$event'])
  handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'Down': {
        event.preventDefault();
        this.highlightNextItem();
        break;
      }
      case 'ArrowUp':
      case 'Up': {
        event.preventDefault();
        this.highlightPrevItem();
        break;
      }
      case 'Enter': {
        event.preventDefault();
        this.selectHighlightedItem();
        return;
      }
    }
  };

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // TODO: extract adjusting height to separate function and constants
    const { top } = this.elRef.nativeElement.getBoundingClientRect();
    this.height = window.innerHeight - top - 24;
  }

  onHighlight = (item: SearchItem) => {
    this.highlightedItemId = item.id;
  };

  onSelect = (item: SearchItem) => {
    this.selectItem.emit(item);
  };

  private highlightNextItem = () => {
    if (!this.highlightedItemId && this.searchResults.length) {
      this.highlightFirstItem();
      return;
    }
    const index = this.searchResults.findIndex(
      (item: SearchItem) => item.id === this.highlightedItemId
    );
    if (index + 1 >= this.searchResults.length) {
      this.highlightFirstItem();
      return;
    }
    this.highlightedItemId = this.searchResults[index + 1].id;
  };

  private highlightPrevItem = () => {
    if (!this.highlightedItemId && this.searchResults.length) {
      this.highlightLastItem();
      return;
    }
    const index = this.searchResults.findIndex(
      (item: SearchItem) => item.id === this.highlightedItemId
    );
    if (index === 0) {
      this.highlightLastItem();
      return;
    }
    this.highlightedItemId = this.searchResults[index - 1].id;
  };

  private highlightFirstItem = () => {
    this.highlightedItemId = this.searchResults[0].id;
  };

  private highlightLastItem = () => {
    this.highlightedItemId =
      this.searchResults[this.searchResults.length - 1].id;
  };

  private selectHighlightedItem = () => {
    if (this.highlightedItemId) {
      const highlightedItem = this.searchResults.find(
        (item: SearchItem) => item.id === this.highlightedItemId
      );
      this.onSelect(highlightedItem);
    }
  };
}
