import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchItem } from '../../utils/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input()
  isLoading: boolean;

  @Input()
  searchResults: SearchItem[];

  @Output()
  search = new EventEmitter<string>();

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  onSearchChange = (event: string) => {
    this.search.emit(event);
  };

  onSelect = (item: SearchItem) => {
    window.open(item.url, '_blank');
  };
}
